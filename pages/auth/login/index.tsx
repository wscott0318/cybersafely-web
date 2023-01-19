import { LoadingButton } from '@mui/lab'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { CenteredLayout } from '../../../components/common/CenteredLayout'
import { NextLink } from '../../../components/common/NextLink'
import { useLoginMutation } from '../../../types/graphql'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const [login, { loading }] = useLoginMutation({
    variables: { email, password },
    onCompleted: async (data, options) => {
      const { token } = data.login
      localStorage.setItem('token', token)

      await options?.client?.clearStore()

      router.push('/dashboard')
    },
  })

  return (
    <CenteredLayout>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          login()
        }}
      >
        <Stack>
          <Typography variant="h5">Login</Typography>
          <TextField required type="email" value={email} label="E-mail" onChange={(e) => setEmail(e.target.value)} />
          <TextField
            required
            type="password"
            value={password}
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Stack spacing={1}>
            <LoadingButton type="submit" loading={loading}>
              Login
            </LoadingButton>
            <NextLink href="/auth/register">
              <Button variant="text">Do you need an account?</Button>
            </NextLink>
          </Stack>
        </Stack>
      </form>
    </CenteredLayout>
  )
}
