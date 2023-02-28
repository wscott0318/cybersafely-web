import { LoadingButton } from '@mui/lab'
import { Stack, TextField } from '@mui/material'
import { z } from 'zod'
import { useForm } from '../../helpers/form'
import { useUpdatePasswordMutation } from '../../schema'
import { useAlert } from '../../utils/context/alert'
import { checkPasswordStrength, PasswordStrength } from '../common/PasswordStrength'

const schema = z
  .object({
    oldPassword: z.string().min(4),
    newPassword: z
      .string()
      .min(4)
      .refine((password) => checkPasswordStrength(password) > 50, 'Password is too weak'),
    repeatNewPassword: z.string(),
  })
  .superRefine(({ newPassword, repeatNewPassword }, ctx) => {
    if (newPassword !== repeatNewPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['repeatNewPassword'],
        message: "The passwords don't match",
      })
    }
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
      onSubmit={form.onSubmit(({ oldPassword, newPassword }) => {
        updatePassword({ variables: { input: { oldPassword, newPassword } } })
      })}
    >
      <Stack>
        <TextField
          required
          type="password"
          label="Password"
          error={form.hasError('oldPassword')}
          value={form.value.oldPassword ?? ''}
          helperText={form.getError('oldPassword')}
          onChange={(e) => form.onChange('oldPassword', e.target.value)}
        />
        <TextField
          required
          type="password"
          label="New Password"
          error={form.hasError('newPassword')}
          value={form.value.newPassword ?? ''}
          helperText={form.getError('newPassword')}
          onChange={(e) => form.onChange('newPassword', e.target.value)}
          InputProps={{ endAdornment: <PasswordStrength password={form.value.newPassword} /> }}
        />
        <TextField
          required
          type="password"
          label="Repeat Password"
          error={form.hasError('repeatNewPassword')}
          value={form.value.repeatNewPassword ?? ''}
          helperText={form.getError('repeatNewPassword')}
          onChange={(e) => form.onChange('repeatNewPassword', e.target.value)}
        />
        <LoadingButton type="submit" loading={loading}>
          Update
        </LoadingButton>
      </Stack>
    </form>
  )
}
