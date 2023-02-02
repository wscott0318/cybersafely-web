import { LoadingButton } from '@mui/lab'
import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, TextField } from '@mui/material'
import { z } from 'zod'
import { useForm } from '../../helpers/form'
import { Address, namedOperations, Team, useUpdateTeamMutation } from '../../types/graphql'
import { useAlert } from '../../utils/context/alert'
import { useUser } from '../../utils/context/auth'

type UpdateTeamFormProps = {
  team: Pick<Team, 'id' | 'name'> & { address?: Pick<Address, 'street' | 'city' | 'state' | 'zip'> | null }
}

const schemaGeneral = z.object({
  name: z.string().min(4),
})

function UpdateTeamGeneralForm({ team }: UpdateTeamFormProps) {
  const { pushAlert } = useAlert()
  const { refetchUser } = useUser()

  const form = useForm(schemaGeneral, {
    name: team?.name,
  })

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
      onSubmit={form.onSubmit((_, input) => {
        updateTeam({ variables: { input } })
      })}
    >
      <Stack>
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

const schemaAddress = z.object({
  street: z.string().min(4),
  city: z.string().min(4),
  state: z.string().min(4),
  zip: z.string().min(4),
})

function UpdateTeamAddressForm({ team }: UpdateTeamFormProps) {
  const { pushAlert } = useAlert()
  const { refetchUser } = useUser()

  const form = useForm(schemaAddress, {
    street: team?.address?.street,
    city: team?.address?.city,
    state: team?.address?.state,
    zip: team?.address?.zip,
  })

  const [updateTeam, { loading }] = useUpdateTeamMutation({
    context: { teamId: team?.id },
    refetchQueries: [namedOperations.Query.team],
    onCompleted() {
      refetchUser()

      pushAlert({
        type: 'alert',
        title: 'Success',
        message: 'The team address was updated successfully',
      })
    },
  })

  return (
    <form
      onSubmit={form.onSubmit((address) => {
        updateTeam({ variables: { input: { address } } })
      })}
    >
      <Stack>
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
        <LoadingButton type="submit" loading={loading}>
          Update
        </LoadingButton>
      </Stack>
    </form>
  )
}

export function UpdateTeamForm(props: UpdateTeamFormProps) {
  return (
    <Box>
      <Accordion defaultExpanded>
        <AccordionSummary>General</AccordionSummary>
        <AccordionDetails>
          <UpdateTeamGeneralForm {...props} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Address</AccordionSummary>
        <AccordionDetails>
          <UpdateTeamAddressForm {...props} />
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}
