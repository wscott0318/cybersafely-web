import { LoadingButton } from '@mui/lab'
import { Divider, Link, Stack, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { z } from 'zod'
import { CoverLayout } from '../../../components/common/CoverLayout'
import { NextLink } from '../../../components/common/NextLink'
import { useForm } from '../../../helpers/form'
import { useLoginMutation } from '../../../types/graphql'
import { StorageManager } from '../../../utils/storage'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
})

export default function Login() {
  const router = useRouter()
  const form = useForm(schema)

  const [login, { loading }] = useLoginMutation({
    onCompleted: async (data, options) => {
      const { token } = data.login
      StorageManager.set('token', token)

      await options?.client?.clearStore()

      router.push('/dashboard')
    },
  })

  return (
    <CoverLayout>
      <form
        onSubmit={form.onSubmit((variables) => {
          login({ variables })
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
          <Divider />
          <Typography>
            Don’t have an account?{' '}
            <NextLink href="/auth/register">
              <Link>Register</Link>
            </NextLink>
          </Typography>
        </Stack>
      </form>
    </CoverLayout>
  )
}
