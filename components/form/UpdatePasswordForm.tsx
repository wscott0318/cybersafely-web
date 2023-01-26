import { LoadingButton } from '@mui/lab'
import { Stack, TextField } from '@mui/material'
import { z } from 'zod'
import { useForm } from '../../helpers/form'
import { useUpdatePasswordMutation } from '../../types/graphql'
import { useAlert } from '../../utils/context/alert'

const schema = z.object({
  oldPassword: z.string().min(4),
  newPassword: z.string().min(4),
})

export function UpdatePasswordForm() {
  const { pushAlert } = useAlert()

  const form = useForm(schema)

  const [updatePassword, { loading }] = useUpdatePasswordMutation({
    onCompleted() {
      form.clear()

      pushAlert({
        type: 'alert',
        title: 'Success',
        message: 'Your password was updated successfully',
      })
    },
  })

  return (
    <form
      onSubmit={form.onSubmit((variables) => {
        updatePassword({ variables })
      })}
    >
      <Stack>
        <TextField
          required
          type="password"
          label="Old Password"
          error={form.hasError('oldPassword')}
          value={form.value.oldPassword ?? ''}
          helperText={form.getError('oldPassword')}
          onChange={(e) => form.onChange({ oldPassword: e.target.value })}
        />
        <TextField
          required
          type="password"
          label="New Password"
          error={form.hasError('newPassword')}
          value={form.value.newPassword ?? ''}
          helperText={form.getError('newPassword')}
          onChange={(e) => form.onChange({ newPassword: e.target.value })}
        />
        <LoadingButton type="submit" loading={loading}>
          Update
        </LoadingButton>
      </Stack>
    </form>
  )
}