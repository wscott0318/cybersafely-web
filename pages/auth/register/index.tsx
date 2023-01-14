import { LoadingButton } from '@mui/lab'
import { Alert, Container, Paper, Stack, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useRegisterMutation } from '../../../types/graphql'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [teamName, setTeamName] = useState('')

  const router = useRouter()

  const [register, { loading, error }] = useRegisterMutation({
    variables: {
      email,
      password,
      user: { name: userName },
      team: { name: teamName },
    },
    onCompleted() {
      router.push('/auth/login')
    },
  })

  return (
    <Container maxWidth="xs" sx={{ py: 2 }}>
      <Paper sx={{ p: 2 }}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            register().catch(() => {})
          }}
        >
          <Stack>
            <TextField required value={userName} label="Name" onChange={(e) => setUserName(e.target.value)} />
            <TextField required type="email" value={email} label="E-mail" onChange={(e) => setEmail(e.target.value)} />
            <TextField
              required
              type="password"
              value={password}
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField required value={teamName} label="Team Name" onChange={(e) => setTeamName(e.target.value)} />
            {error && <Alert severity="error">{error.message}</Alert>}
            <LoadingButton type="submit" loading={loading}>
              Register
            </LoadingButton>
          </Stack>
        </form>
      </Paper>
    </Container>
  )
}
