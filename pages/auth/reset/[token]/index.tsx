import { LoadingButton } from '@mui/lab'
import { Stack, TextField, Typography } from '@mui/material'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { z } from 'zod'
import { CoverLayout } from '../../../../components/common/CoverLayout'
import { useForm } from '../../../../helpers/form'
import { useResetPasswordMutation } from '../../../../types/graphql'

const schema = z.object({
  password: z.string().min(4),
})

type Props = {
  passwordToken: string
}

export default function ResetPassword({ passwordToken }: Props) {
  const router = useRouter()
  const form = useForm(schema)

  const [resetPassword, { loading }] = useResetPasswordMutation({
    onCompleted: () => {
      router.push('/auth/login')
    },
  })

  return (
    <CoverLayout>
      <form
        onSubmit={form.onSubmit((variables) => {
          resetPassword({ variables: { ...variables, passwordToken } })
        })}
      >
        <Stack spacing={4}>
          <Typography variant="h4">Change Password</Typography>
          <TextField
            required
            size="medium"
            type="password"
            variant="outlined"
            label="New Password"
            error={form.hasError('password')}
            value={form.value.password ?? ''}
            helperText={form.getError('password')}
            onChange={(e) => form.onChange({ password: e.target.value })}
          />
          <LoadingButton type="submit" loading={loading} size="large">
            Submit
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
