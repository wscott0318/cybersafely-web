import { LoadingButton } from '@mui/lab'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { CenteredLayout } from '../../../components/common/CenteredLayout'
import { NextLink } from '../../../components/common/NextLink'
import { useRegisterMutation } from '../../../types/graphql'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [teamName, setTeamName] = useState('')

  const router = useRouter()

  const [register, { loading }] = useRegisterMutation({
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
    <CenteredLayout>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          register()
        }}
      >
        <Stack>
          <Typography variant="h5">Register</Typography>
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
          <Stack spacing={1}>
            <LoadingButton type="submit" loading={loading}>
              Register
            </LoadingButton>
            <NextLink href="/auth/login">
              <Button variant="text">Already have an account?</Button>
            </NextLink>
          </Stack>
        </Stack>
      </form>
    </CenteredLayout>
  )
}
