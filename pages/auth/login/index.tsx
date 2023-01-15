import { LoadingButton } from '@mui/lab'
import { Alert, Button, Container, Paper, Stack, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { NextLink } from '../../../components/common/NextLink'
import { useLoginMutation } from '../../../types/graphql'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('password')

  const router = useRouter()

  const [login, { loading, error }] = useLoginMutation({
    variables: { email, password },
    onCompleted(data) {
      const { token } = data.login
      localStorage.setItem('token', token)

      router.push('/dashboard')
    },
  })

  return (
    <Container maxWidth="xs" sx={{ py: 2 }}>
      <Paper sx={{ p: 2 }}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            login().catch(() => {})
          }}
        >
          <Stack>
            <TextField required type="email" value={email} label="E-mail" onChange={(e) => setEmail(e.target.value)} />
            <TextField
              required
              type="password"
              value={password}
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <Alert severity="error">{error.message}</Alert>}
            <LoadingButton type="submit" loading={loading}>
              Login
            </LoadingButton>
            <NextLink href="/auth/register">
              <Button variant="text">Register</Button>
            </NextLink>
          </Stack>
        </form>
      </Paper>
    </Container>
  )
}