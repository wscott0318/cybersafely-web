import { LoadingButton } from '@mui/lab'
import { Stack, TextField, Typography } from '@mui/material'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { CenteredLayout } from '../../../../components/common/CenteredLayout'
import { useActivateMutation } from '../../../../types/graphql'

type Props = {
  passwordToken: string
}

export default function Activate({ passwordToken }: Props) {
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')

  const router = useRouter()

  const [activate, { loading }] = useActivateMutation({
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
    <CenteredLayout>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          activate()
        }}
      >
        <Stack>
          <Typography variant="h5">Activate</Typography>
          <TextField required value={userName} label="Name" onChange={(e) => setUserName(e.target.value)} />
          <TextField
            required
            type="password"
            value={password}
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoadingButton type="submit" loading={loading}>
            Activate
          </LoadingButton>
        </Stack>
      </form>
    </CenteredLayout>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const passwordToken = ctx.params!.token as string
  return { props: { passwordToken } }
}
