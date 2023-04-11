import { Accordion, AccordionDetails, AccordionSummary, Box, Skeleton, Stack, Typography } from '@mui/material'
import { useCallback } from 'react'
import { z } from 'zod'
import {
  SchoolQuery,
  useCreateAddressMutation,
  useSchoolQuery,
  useUpdateAddressMutation,
  useUpdateSchoolMutation,
} from '../../schema'
import { AccordionContext } from '../common/AccordionContext'
import { QueryLoader, QueryLoaderRenderProps } from '../common/QueryLoader'
import { Form } from '../common/form/Form'
import { FormAvatar } from '../common/form/FormAvatar'
import { FormImage } from '../common/form/FormImage'
import { FormText } from '../common/form/FormText'

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
  include,
  exclude,
  data: { school },
  query: { refetch },
}: UpdateSchoolFormProps & QueryLoaderRenderProps<SchoolQuery>) {
  const [updateSchool] = useUpdateSchoolMutation()
  const [createAddress] = useCreateAddressMutation()
  const [updateAddress] = useUpdateAddressMutation()

  const isShown = useCallback(
    (section: Section) => {
      if (include && include.length > 0) {
        return include.includes(section)
      }
      if (exclude && exclude.length > 0) {
        return !exclude.includes(section)
      }
      return true
    },
    [include, exclude]
  )

  return (
    <Stack>
      <Box position="relative">
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
        <Box position="absolute" right={(theme) => theme.spacing(3)} bottom={-50}>
          <FormAvatar
            forId={school.id}
            for="SCHOOL_LOGO"
            image={school.logo}
            onChange={async () => {
              await refetch()
              onChange?.()
            }}
          />
        </Box>
      </Box>
      <AccordionContext title={school.name}>
        {isShown('information') && (
          <Accordion>
            <AccordionSummary>Information</AccordionSummary>
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
                <FormText name="name" label="Name" required />
                <FormText name="phone" label="Phone" type="phone" />
              </Form>
            </AccordionDetails>
          </Accordion>
        )}
        {isShown('address') && (
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
        )}
      </AccordionContext>
    </Stack>
  )
}

type Section = 'information' | 'address'

type UpdateSchoolFormProps = {
  schoolId: string
  onChange?: () => void
  include?: Section[]
  exclude?: Section[]
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
