import { LoadingButton } from '@mui/lab'
import { Stack, TextField, Typography } from '@mui/material'
import { z } from 'zod'
import { CoverLayout } from '../../../components/common/CoverLayout'
import { useForm } from '../../../helpers/form'
import { useForgotPasswordMutation } from '../../../schema'
import { useAlert } from '../../../utils/context/alert'

const schema = z.object({
  email: z.string().email(),
})

export default function ResetPassword() {
  const form = useForm(schema)

  const { pushAlert } = useAlert()

  const [forgotPassword, { loading }] = useForgotPasswordMutation({
    onCompleted: () => {
      pushAlert({
        type: 'alert',
        title: 'Success',
        message: 'Please check your inbox and follow the instructions',
      })
    },
  })

  return (
    <CoverLayout>
      <form
        onSubmit={form.onSubmit((variables) => {
          forgotPassword({ variables })
        })}
      >
        <Stack spacing={4}>
          <Typography variant="h4">Forgot Password</Typography>
          <TextField
            required
            autoFocus
            type="email"
            size="medium"
            label="E-mail"
            variant="outlined"
            error={form.hasError('email')}
            value={form.value.email ?? ''}
            helperText={form.getError('email')}
            onChange={(e) => form.onChange('email', e.target.value)}
          />
          <LoadingButton type="submit" loading={loading} size="large">
            Submit
          </LoadingButton>
        </Stack>
      </form>
    </CoverLayout>
  )
}
