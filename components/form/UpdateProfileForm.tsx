import { LoadingButton } from '@mui/lab'
import { Stack, TextField } from '@mui/material'
import { z } from 'zod'
import { useForm } from '../../helpers/form'
import { useUpdateProfileMutation } from '../../types/graphql'
import { useAlert } from '../../utils/context/alert'
import { useUser } from '../../utils/context/auth'

const schema = z.object({
  name: z.string().min(4),
})

export function UpdateProfileForm() {
  const { pushAlert } = useAlert()
  const { user, refetchUser } = useUser()

  const form = useForm(schema, {
    name: user.name,
  })

  const [updateProfile, { loading }] = useUpdateProfileMutation({
    onCompleted() {
      refetchUser()

      pushAlert({
        type: 'alert',
        title: 'Success',
        message: 'Your profile was updated successfully',
      })
    },
  })

  return (
    <form
      onSubmit={form.onSubmit((input) => {
        updateProfile({ variables: { input } })
      })}
    >
      <Stack>
        <TextField
          required
          label="Name"
          error={form.hasError('name')}
          value={form.value.name ?? ''}
          helperText={form.getError('name')}
          onChange={(e) => form.onChange({ name: e.target.value })}
        />
        <LoadingButton type="submit" loading={loading}>
          Update
        </LoadingButton>
      </Stack>
    </form>
  )
}
