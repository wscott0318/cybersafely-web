import { LoadingButton } from '@mui/lab'
import { Divider, Link, Stack, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { z } from 'zod'
import { CoverLayout } from '../../../components/common/CoverLayout'
import { NextLink } from '../../../components/common/NextLink'
import { useForm } from '../../../helpers/form'
import { useLoginWithEmailMutation, useSettingsQuery } from '../../../schema'
import { StorageManager } from '../../../utils/storage'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
})

function RegisterButton() {
  const { data } = useSettingsQuery()

  if (!data?.settings.enableSignUps) {
    return null
  }

  return (
    <>
      <Divider />
      <Typography>
        Don’t have an account?{' '}
        <NextLink href="/auth/register">
          <Link>Register</Link>
        </NextLink>
      </Typography>
    </>
  )
}

export default function Login() {
  const router = useRouter()
  const form = useForm(schema)

  const [login, { loading }] = useLoginWithEmailMutation({
    onCompleted: async (data, options) => {
      const { token, user } = data.loginWithEmail

      StorageManager.clear()
      StorageManager.set('token', token)
      StorageManager.set('userId', user.id)

      await options?.client?.clearStore()

      router.push('/dashboard')
    },
  })

  return (
    <CoverLayout>
      <form
        onSubmit={form.onSubmit((input) => {
          login({ variables: { input } })
        })}
      >
        <Stack spacing={4}>
          <Typography variant="h4">Login</Typography>
          <TextField
            required
            autoFocus
            name="email"
            type="email"
            size="medium"
            label="E-mail"
            variant="outlined"
            error={form.hasError('email')}
            value={form.value.email ?? ''}
            helperText={form.getError('email')}
            onChange={(e) => form.onChange('email', e.target.value)}
          />
          <TextField
            required
            size="medium"
            name="password"
            type="password"
            label="Password"
            variant="outlined"
            error={form.hasError('password')}
            value={form.value.password ?? ''}
            helperText={form.getError('password')}
            onChange={(e) => form.onChange('password', e.target.value)}
          />
          <LoadingButton type="submit" loading={loading} size="large">
            Login
          </LoadingButton>
          <NextLink href="/auth/reset">
            <Link textAlign="right">Forgot password?</Link>
          </NextLink>
          <RegisterButton />
        </Stack>
      </form>
    </CoverLayout>
  )
}
