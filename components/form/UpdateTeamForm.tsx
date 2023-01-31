import { LoadingButton } from '@mui/lab'
import { Stack, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { z } from 'zod'
import { useForm } from '../../helpers/form'
import { useLeaveTeamMutation, useUpdateTeamMutation } from '../../types/graphql'
import { useAlert } from '../../utils/context/alert'
import { useTeam, useUser } from '../../utils/context/auth'

function LeaveTeamButton() {
  const router = useRouter()
  const { pushAlert } = useAlert()
  const { refetchUser } = useUser()

  const [leaveTeam, { loading }] = useLeaveTeamMutation({
    async onCompleted() {
      await refetchUser()
      router.push('/dashboard')
    },
  })

  return (
    <LoadingButton
      color="error"
      variant="text"
      loading={loading}
      onClick={() => {
        pushAlert({
          type: 'confirm',
          title: 'Leave Team',
          message: 'Are you sure you want to leave team?',
          confirm: () => {
            leaveTeam()
          },
        })
      }}
    >
      Leave Team
    </LoadingButton>
  )
}

const schema = z.object({
  name: z.string().min(4),
})

export function UpdateTeamForm() {
  const { pushAlert } = useAlert()
  const { refetchUser } = useUser()
  const team = useTeam()

  const form = useForm(schema, {
    name: team?.team.name,
  })

  const disabled = useMemo(() => {
    return team?.role !== 'ADMIN'
  }, [team])

  const [updateTeam, { loading }] = useUpdateTeamMutation({
    onCompleted() {
      refetchUser()

      pushAlert({
        type: 'alert',
        title: 'Success',
        message: 'Your team was updated successfully',
      })
    },
  })

  return (
    <form
      onSubmit={form.onSubmit((_, input) => {
        updateTeam({ variables: { input } })
      })}
    >
      <Stack>
        <TextField
          required
          label="Name"
          disabled={disabled}
          error={form.hasError('name')}
          value={form.value.name ?? ''}
          helperText={form.getError('name')}
          onChange={(e) => form.onChange({ name: e.target.value })}
        />
        <Stack spacing={1}>
          {!disabled && (
            <LoadingButton type="submit" loading={loading}>
              Update
            </LoadingButton>
          )}
          <LeaveTeamButton />
        </Stack>
      </Stack>
    </form>
  )
}
