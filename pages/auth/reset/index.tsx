import { LoadingButton } from '@mui/lab'
import { Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { CenteredLayout } from '../../../components/common/CenteredLayout'
import { useRequestResetPasswordMutation } from '../../../types/graphql'
import { useAlert } from '../../../utils/context/alert'

export default function ResetPassword() {
  const { pushAlert } = useAlert()

  const [email, setEmail] = useState('')

  const [reset, { loading }] = useRequestResetPasswordMutation({
    variables: { email },
    onCompleted: () => {
      pushAlert({
        type: 'alert',
        title: 'Success',
        message: 'Please check your inbox and follow the instructions',
      })
    },
  })

  return (
    <CenteredLayout>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          reset()
        }}
      >
        <Stack>
          <Typography variant="h5">Reset</Typography>
          <TextField
            required
            autoFocus
            type="email"
            value={email}
            label="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <LoadingButton type="submit" loading={loading}>
            Reset
          </LoadingButton>
        </Stack>
      </form>
    </CenteredLayout>
  )
}
