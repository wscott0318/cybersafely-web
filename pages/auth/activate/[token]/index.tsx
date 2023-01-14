import { LoadingButton } from '@mui/lab'
import { Alert, Container, Paper, Stack, TextField } from '@mui/material'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useActivateMutation } from '../../../../types/graphql'

type Props = {
  passwordToken: string
}

export default function Activate({ passwordToken }: Props) {
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')

  const router = useRouter()

  const [activate, { loading, error }] = useActivateMutation({
    variables: {
      password,
      passwordToken,
      user: { name: userName },
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
            activate().catch(() => {})
          }}
        >
          <Stack>
            <TextField required value={userName} label="Name" onChange={(e) => setUserName(e.target.value)} />
            <TextField
              required
              type="password"
              value={password}
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <Alert severity="error">{error.message}</Alert>}
            <LoadingButton type="submit" loading={loading}>
              Activate
            </LoadingButton>
          </Stack>
        </form>
      </Paper>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const passwordToken = ctx.params!.token as string
  return { props: { passwordToken } }
}
