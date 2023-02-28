import { LoadingButton } from '@mui/lab'
import { Stack, TextField } from '@mui/material'
import { z } from 'zod'
import { useForm } from '../../helpers/form'
import { useRemoveImageMutation, useUpdateImageMutation, useUpdateUserMutation } from '../../schema'
import { useAlert } from '../../utils/context/alert'
import { useUser } from '../../utils/context/auth'
import { UploadImage } from '../common/UploadImage'

export function UpdateAvatarForm() {
  const { user, refetchUser } = useUser()

  const [updateImage] = useUpdateImageMutation({
    onCompleted() {
      refetchUser()
    },
  })
  const [removeImage] = useRemoveImageMutation({
    onCompleted() {
      refetchUser()
    },
  })

  return (
    <UploadImage
      src={user.avatar?.url}
      onUpload={(uploadId) => {
        if (typeof uploadId === 'string') {
          updateImage({ variables: { input: { uploadId, for: 'USER_AVATAR', forId: user.id } } })
        } else if (user.avatar) {
          removeImage({ variables: { id: user.avatar.id } })
        }
      }}
    />
  )
}

const schema = z.object({
  newEmail: z.string().email(),
  name: z.string().min(4),
})

export function UpdateProfileForm() {
  const { pushAlert } = useAlert()
  const { user, refetchUser } = useUser()

  const form = useForm(schema, {
    newEmail: user.email,
    name: user.name,
  })

  const [updateUser, { loading }] = useUpdateUserMutation({
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
      onSubmit={form.onSubmit(async (_, input) => {
        await updateUser({ variables: { id: user.id, input } })

        if (!!input.newEmail) {
          pushAlert({
            type: 'alert',
            title: 'Verify E-mail',
            message: 'Please check your inbox and follow the instructions',
          })
        }
      })}
    >
      <Stack>
        <TextField
          required
          type="email"
          label="E-mail"
          error={form.hasError('newEmail')}
          value={form.value.newEmail ?? ''}
          helperText={form.getError('newEmail')}
          onChange={(e) => form.onChange('newEmail', e.target.value)}
        />
        <TextField
          required
          label="Name"
          error={form.hasError('name')}
          value={form.value.name ?? ''}
          helperText={form.getError('name')}
          onChange={(e) => form.onChange('name', e.target.value)}
        />
        <LoadingButton type="submit" loading={loading}>
          Update
        </LoadingButton>
      </Stack>
    </form>
  )
}
