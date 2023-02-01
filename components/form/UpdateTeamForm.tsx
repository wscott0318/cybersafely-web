import { LoadingButton } from '@mui/lab'
import { Stack, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { z } from 'zod'
import { useForm } from '../../helpers/form'
import {
  Address,
  namedOperations,
  Team,
  TeamUpdate,
  useLeaveTeamMutation,
  useUpdateTeamMutation,
} from '../../types/graphql'
import { useAlert } from '../../utils/context/alert'
import { useTeamRole, useUser } from '../../utils/context/auth'

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
  street: z.string().min(4),
  city: z.string().min(4),
  state: z.string().min(4),
  zip: z.string().min(4),
})

type UpdateTeamFormProps = {
  team?: Pick<Team, 'id' | 'name'> & { address?: Pick<Address, 'street' | 'city' | 'state' | 'zip'> | null }
}

export function UpdateTeamForm(props: UpdateTeamFormProps) {
  const { pushAlert } = useAlert()
  const { refetchUser } = useUser()

  const teamRole = useTeamRole()
  const team = teamRole?.team ?? props.team

  const form = useForm(schema, {
    name: team?.name,
    street: team?.address?.street,
    city: team?.address?.city,
    state: team?.address?.state,
    zip: team?.address?.zip,
  })

  const disabled = useMemo(() => teamRole?.role === 'ATHLETE', [teamRole])

  const [updateTeam, { loading }] = useUpdateTeamMutation({
    context: { teamId: team?.id },
    refetchQueries: [namedOperations.Query.team],
    onCompleted() {
      refetchUser()

      pushAlert({
        type: 'alert',
        title: 'Success',
        message: 'The team was updated successfully',
      })
    },
  })

  return (
    <form
      onSubmit={form.onSubmit((data, value) => {
        const input: TeamUpdate = {
          name: value.name,
        }

        if (!!value.street || !!value.city || !!value.state || !!value.zip) {
          input.address = {
            street: data.street,
            city: data.city,
            state: data.state,
            zip: data.zip,
          }
        }

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
          onChange={(e) => form.onChange('name', e.target.value)}
        />
        <TextField
          required
          label="Street"
          error={form.hasError('street')}
          value={form.value.street ?? ''}
          helperText={form.getError('street')}
          onChange={(e) => form.onChange('street', e.target.value)}
        />
        <TextField
          required
          label="City"
          error={form.hasError('city')}
          value={form.value.city ?? ''}
          helperText={form.getError('city')}
          onChange={(e) => form.onChange('city', e.target.value)}
        />
        <TextField
          required
          label="State"
          error={form.hasError('state')}
          value={form.value.state ?? ''}
          helperText={form.getError('state')}
          onChange={(e) => form.onChange('state', e.target.value)}
        />
        <TextField
          required
          label="ZIP"
          error={form.hasError('zip')}
          value={form.value.zip ?? ''}
          helperText={form.getError('zip')}
          onChange={(e) => form.onChange('zip', e.target.value)}
        />
        <Stack spacing={1}>
          {!disabled && (
            <LoadingButton type="submit" loading={loading}>
              Update
            </LoadingButton>
          )}
          {teamRole && <LeaveTeamButton />}
        </Stack>
      </Stack>
    </form>
  )
}
