import { LoadingButton } from '@mui/lab'
import { Stack, TextField, Typography } from '@mui/material'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { z } from 'zod'
import { CoverLayout } from '../../../../components/common/CoverLayout'
import { useForm } from '../../../../helpers/form'
import { useActivateMutation } from '../../../../types/graphql'

const schema = z.object({
  password: z.string().min(4),
  user: z.object({
    name: z.string().min(4),
  }),
})

type Props = {
  passwordToken: string
}

export default function Activate({ passwordToken }: Props) {
  const router = useRouter()
  const form = useForm(schema)

  const [activate, { loading }] = useActivateMutation({
    onCompleted() {
      router.push('/auth/login')
    },
  })

  return (
    <CoverLayout>
      <form
        onSubmit={form.onSubmit((variables) => {
          activate({ variables: { ...variables, passwordToken } })
        })}
      >
        <Stack spacing={4}>
          <Typography variant="h4">Activate</Typography>
          <TextField
            required
            label="Name"
            size="medium"
            variant="outlined"
            error={form.hasError('user.name')}
            value={form.value.user?.name ?? ''}
            helperText={form.getError('user.name')}
            onChange={(e) => form.onChange({ user: { name: e.target.value } })}
          />
          <TextField
            required
            size="medium"
            type="password"
            label="Password"
            variant="outlined"
            error={form.hasError('password')}
            value={form.value.password ?? ''}
            helperText={form.getError('password')}
            onChange={(e) => form.onChange({ password: e.target.value })}
          />
          <LoadingButton type="submit" loading={loading} size="large">
            Activate
          </LoadingButton>
        </Stack>
      </form>
    </CoverLayout>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const passwordToken = ctx.params!.token as string
  return { props: { passwordToken } }
}
