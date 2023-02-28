import { LoadingButton } from '@mui/lab'
import { Stack, TextField, Typography } from '@mui/material'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { z } from 'zod'
import { CoverLayout } from '../../../../components/common/CoverLayout'
import { checkPasswordStrength, PasswordStrength } from '../../../../components/common/PasswordStrength'
import { useForm } from '../../../../helpers/form'
import { useResetPasswordMutation } from '../../../../schema'

const schema = z
  .object({
    password: z
      .string()
      .min(4)
      .refine((password) => checkPasswordStrength(password) > 50, 'Password is too weak'),
    repeatPassword: z.string(),
  })
  .superRefine(({ password, repeatPassword }, ctx) => {
    if (password !== repeatPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['repeatPassword'],
        message: "The passwords don't match",
      })
    }
  })

type Props = {
  token: string
}

export default function ResetPassword({ token }: Props) {
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
        onSubmit={form.onSubmit(({ password }) => {
          resetPassword({ variables: { input: { token, password } } })
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
            onChange={(e) => form.onChange('password', e.target.value)}
            InputProps={{ endAdornment: <PasswordStrength password={form.value.password} /> }}
          />
          <TextField
            required
            size="medium"
            type="password"
            variant="outlined"
            label="Repeat Password"
            error={form.hasError('repeatPassword')}
            value={form.value.repeatPassword ?? ''}
            helperText={form.getError('repeatPassword')}
            onChange={(e) => form.onChange('repeatPassword', e.target.value)}
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
  const token = ctx.params!.token as string
  return { props: { token } }
}
