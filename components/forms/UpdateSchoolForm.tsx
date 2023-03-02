import { Accordion, AccordionDetails, AccordionSummary, Alert, Skeleton, Stack, Typography } from '@mui/material'
import { z } from 'zod'
import {
  SchoolQuery,
  useCreateAddressMutation,
  useSchoolQuery,
  useUpdateAddressMutation,
  useUpdateSchoolMutation,
} from '../../schema'
import { AccordionContext } from '../common/AccordionContext'
import { Form } from '../common/form/Form'
import { FormAvatar } from '../common/form/FormAvatar'
import { FormImage } from '../common/form/FormImage'
import { FormText } from '../common/form/FormText'
import { QueryLoader, QueryLoaderRenderProps } from '../common/QueryLoader'

function Loading() {
  return (
    <Stack>
      <Skeleton variant="text">
        <Typography variant="h5">Loading</Typography>
      </Skeleton>
      <Stack spacing={1}>
        <Skeleton variant="rounded" height={56} />
        <Skeleton variant="rounded" height={56} />
        <Skeleton variant="rounded" height={56} />
        <Skeleton variant="rounded" height={56} />
        <Skeleton variant="rounded" height={56} />
      </Stack>
    </Stack>
  )
}

const schoolSchema = z.object({
  name: z.string().min(4),
  phone: z.string().nullable().optional(),
})

const addressSchema = z.object({
  street: z.string().min(4),
  city: z.string().min(4),
  state: z.string().min(4),
  zip: z.string().min(4),
})

function Render({
  onChange,
  data: { school },
  query: { refetch },
}: UpdateSchoolFormProps & QueryLoaderRenderProps<SchoolQuery>) {
  const [updateSchool] = useUpdateSchoolMutation()
  const [createAddress] = useCreateAddressMutation()
  const [updateAddress] = useUpdateAddressMutation()

  return (
    <AccordionContext title="School" initialSelected={0}>
      <Accordion>
        <AccordionSummary>Account</AccordionSummary>
        <AccordionDetails>
          <Form
            submit="Update"
            schema={schoolSchema}
            defaultValues={{
              name: school.name,
              phone: school.phone,
            }}
            onSubmit={async (data, input) => {
              await updateSchool({ variables: { id: school.id, input } })
              await refetch()
              onChange?.()
            }}
          >
            <FormImage
              aspect={9 / 21}
              forId={school.id}
              for="SCHOOL_COVER"
              image={school.cover}
              onChange={async () => {
                await refetch()
                onChange?.()
              }}
            />
            <Stack direction="row" alignItems="center" spacing={3}>
              <FormAvatar
                forId={school.id}
                for="SCHOOL_LOGO"
                image={school.logo}
                onChange={async () => {
                  await refetch()
                  onChange?.()
                }}
              />
              <Stack flexGrow={1}>
                <FormText name="name" label="Name" required />
                <FormText name="phone" label="Phone" type="phone" />
              </Stack>
            </Stack>
          </Form>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Address</AccordionSummary>
        <AccordionDetails>
          <Form
            submit="Update"
            schema={addressSchema}
            defaultValues={{
              street: school.address?.street,
              city: school.address?.city,
              state: school.address?.state,
              zip: school.address?.zip,
            }}
            onSubmit={async (data, input) => {
              if (!school.address) {
                await createAddress({
                  variables: {
                    input: data,
                    schoolId: school.id,
                  },
                })
              } else {
                await updateAddress({
                  variables: {
                    input,
                    id: school.address.id,
                  },
                })
              }
              await refetch()
              onChange?.()
            }}
          >
            <FormText name="street" label="Street" required />
            <FormText name="city" label="City" required />
            <FormText name="state" label="State" required />
            <FormText name="zip" label="ZIP" required />
          </Form>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Billing</AccordionSummary>
        <AccordionDetails>
          <Alert severity="info">Billing coming soon</Alert>
        </AccordionDetails>
      </Accordion>
    </AccordionContext>
  )
}

type UpdateSchoolFormProps = {
  schoolId: string
  onChange?: () => void
}

export function UpdateSchoolForm(props: UpdateSchoolFormProps) {
  const query = useSchoolQuery({
    variables: { id: props.schoolId },
    notifyOnNetworkStatusChange: false,
  })

  return (
    <QueryLoader query={query} loading={Loading} render={(renderProps) => <Render {...props} {...renderProps} />} />
  )
}
