import { LoadingButton } from '@mui/lab'
import { Accordion, AccordionDetails, AccordionSummary, Alert, Stack, TextField } from '@mui/material'
import { z } from 'zod'
import { useForm } from '../../helpers/form'
import {
  Address,
  Image,
  namedOperations,
  School,
  UpdateSchoolMutationFn,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useUpdateSchoolMutation,
} from '../../schema'
import { useAlert } from '../../utils/context/alert'
import { useUser } from '../../utils/context/auth'
import { AccordionContext } from '../common/AccordionContext'
import { UpdateImage } from '../common/UpdateImage'

type UpdateSchoolFormProps = {
  school: Pick<School, 'id' | 'name' | 'phone'> & {
    logo?: Pick<Image, 'id' | 'url'> | null
    cover?: Pick<Image, 'id' | 'url'> | null
  } & {
    address?: Pick<Address, 'id' | 'street' | 'city' | 'state' | 'zip'> | null
  }
}

type UpdateSchoolSubFormProps = UpdateSchoolFormProps & {
  loading: boolean
  updateSchool: UpdateSchoolMutationFn
}

function UpdateSchoolLogoForm({ school }: UpdateSchoolSubFormProps) {
  return (
    <UpdateImage
      image={school.logo}
      for="SCHOOL_LOGO"
      forId={school.id}
      refetchQueries={[namedOperations.Query.school, namedOperations.Query.myUser]}
    />
  )
}

function UpdateSchoolCoverForm({ school }: UpdateSchoolSubFormProps) {
  return (
    <UpdateImage
      image={school.cover}
      for="SCHOOL_COVER"
      forId={school.id}
      refetchQueries={[namedOperations.Query.school]}
    />
  )
}

const schemaGeneral = z.object({
  name: z.string().min(4),
  phone: z
    .union([z.string().min(4), z.string().length(0)])
    .optional()
    .transform((e) => (e === '' ? null : e)),
})

function UpdateSchoolGeneralForm({ school, updateSchool, loading }: UpdateSchoolSubFormProps) {
  const form = useForm(schemaGeneral, {
    name: school?.name,
    phone: school?.phone ?? undefined,
  })

  return (
    <form
      onSubmit={form.onSubmit((_, input) => {
        updateSchool({ variables: { id: school.id, input } })
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
        <TextField
          label="Phone"
          error={form.hasError('phone')}
          value={form.value.phone ?? ''}
          helperText={form.getError('phone')}
          onChange={(e) => form.onChange('phone', e.target.value)}
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

function UpdateSchoolAddressForm({ school, loading }: UpdateSchoolSubFormProps) {
  const [createAddress] = useCreateAddressMutation({
    refetchQueries: [namedOperations.Query.school],
  })
  const [updateAddress] = useUpdateAddressMutation({
    refetchQueries: [namedOperations.Query.school],
  })

  const form = useForm(schemaAddress, {
    street: school.address?.street,
    city: school.address?.city,
    state: school.address?.state,
    zip: school.address?.zip,
  })

  return (
    <form
      onSubmit={form.onSubmit((data, delta) => {
        if (!school.address) {
          createAddress({ variables: { schoolId: school.id, input: data } })
        } else {
          updateAddress({ variables: { id: school.address.id, input: delta } })
        }
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
    <AccordionContext initialSelected={2}>
      <Accordion>
        <AccordionSummary>Logo</AccordionSummary>
        <AccordionDetails>
          <UpdateSchoolLogoForm {...props} updateSchool={updateSchool} loading={loading} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Cover</AccordionSummary>
        <AccordionDetails>
          <UpdateSchoolCoverForm {...props} updateSchool={updateSchool} loading={loading} />
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
      <Accordion>
        <AccordionSummary>Billing</AccordionSummary>
        <AccordionDetails>
          <Alert severity="info">Stripe coming soon</Alert>
        </AccordionDetails>
      </Accordion>
    </AccordionContext>
  )
}
