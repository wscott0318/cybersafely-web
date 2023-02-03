import { LoadingButton } from '@mui/lab'
import { Accordion, AccordionDetails, AccordionSummary, Stack, TextField } from '@mui/material'
import { z } from 'zod'
import { useForm } from '../../helpers/form'
import {
  Address,
  Image,
  namedOperations,
  School,
  UpdateSchoolMutationFn,
  useUpdateSchoolMutation,
} from '../../types/graphql'
import { useAlert } from '../../utils/context/alert'
import { useUser } from '../../utils/context/auth'
import { AccordionContext } from '../common/AccordionContext'
import { UploadAvatar } from '../common/UploadAvatar'

type UpdateSchoolFormProps = {
  school: Pick<School, 'id' | 'name'> & { logo?: Pick<Image, 'url'> | null } & {
    address?: Pick<Address, 'street' | 'city' | 'state' | 'zip'> | null
  }
}

type UpdateSchoolSubFormProps = UpdateSchoolFormProps & {
  loading: boolean
  updateSchool: UpdateSchoolMutationFn
}

function UpdateSchoolLogoForm({ school, updateSchool }: UpdateSchoolSubFormProps) {
  return (
    <UploadAvatar
      src={school.logo?.url}
      onUpload={(logo) => {
        updateSchool({ variables: { input: { logo } } })
      }}
    />
  )
}

const schemaGeneral = z.object({
  name: z.string().min(4),
})

function UpdateSchoolGeneralForm({ school, updateSchool, loading }: UpdateSchoolSubFormProps) {
  const form = useForm(schemaGeneral, {
    name: school?.name,
  })

  return (
    <form
      onSubmit={form.onSubmit((_, input) => {
        updateSchool({ variables: { input } })
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

function UpdateSchoolAddressForm({ school, updateSchool, loading }: UpdateSchoolSubFormProps) {
  const form = useForm(schemaAddress, {
    street: school?.address?.street,
    city: school?.address?.city,
    state: school?.address?.state,
    zip: school?.address?.zip,
  })

  return (
    <form
      onSubmit={form.onSubmit((address) => {
        updateSchool({ variables: { input: { address } } })
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

export function UpdateSchoolForm(props: UpdateSchoolFormProps) {
  const { pushAlert } = useAlert()
  const { refetchUser } = useUser()

  const [updateSchool, { loading }] = useUpdateSchoolMutation({
    refetchQueries: [namedOperations.Query.school],
    onCompleted() {
      refetchUser()

      pushAlert({
        type: 'alert',
        title: 'Success',
        message: 'The school was updated successfully',
      })
    },
  })

  return (
    <AccordionContext initialSelected={1}>
      <Accordion>
        <AccordionSummary>Logo</AccordionSummary>
        <AccordionDetails>
          <UpdateSchoolLogoForm {...props} updateSchool={updateSchool} loading={loading} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>General</AccordionSummary>
        <AccordionDetails>
          <UpdateSchoolGeneralForm {...props} updateSchool={updateSchool} loading={loading} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Address</AccordionSummary>
        <AccordionDetails>
          <UpdateSchoolAddressForm {...props} updateSchool={updateSchool} loading={loading} />
        </AccordionDetails>
      </Accordion>
    </AccordionContext>
  )
}
