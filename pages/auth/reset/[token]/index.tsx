import { LoadingButton } from '@mui/lab'
import { Stack, TextField, Typography } from '@mui/material'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { CenteredLayout } from '../../../../components/common/CenteredLayout'
import { useResetPasswordMutation } from '../../../../types/graphql'

type Props = {
  passwordToken: string
}

export default function ResetPassword({ passwordToken }: Props) {
  const [password, setPassword] = useState('')

  const router = useRouter()

  const [resetPassword, { loading }] = useResetPasswordMutation({
    variables: { password, passwordToken },
    onCompleted: () => {
      router.push('/auth/login')
    },
  })

  return (
    <CenteredLayout>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          resetPassword()
        }}
      >
        <Stack>
          <Typography variant="h5">Reset Password</Typography>
          <TextField
            required
            type="password"
            value={password}
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoadingButton type="submit" loading={loading}>
            Reset Password
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
