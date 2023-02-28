import { Container, Paper, Stack } from '@mui/material'
import { z } from 'zod'
import { Form } from '../components/common/form/Form'
import { FormButton } from '../components/common/form/FormButton'
import { FormError } from '../components/common/form/FormError'
import { FormImage } from '../components/common/form/FormImage'
import { FormText } from '../components/common/form/FormText'
import { FormToggleGroup } from '../components/common/form/FormToggleGroup'
import { withDashboardLayout } from '../components/dashboard/Layout'
import { toggleGroup } from '../helpers/form'
import { useUpdateSchoolMutation } from '../types/graphql'
import { useSchoolRole, useUser } from '../utils/context/auth'

const schema = z.object({
  logo: z.string().nullable().optional(),
  name: z.string().min(4),
  phone: z.string(),
  addressShown: z.boolean(),
  address: z
    .object({
      street: z.string().min(4),
      city: z.string().min(4),
      state: z.string().min(4),
      zip: z.string().min(4),
    })
    .nullable()
    .optional(),
})

function FormPage() {
  const { refetchUser } = useUser()
  const schoolRole = useSchoolRole()

  const [update] = useUpdateSchoolMutation({
    onCompleted() {
      refetchUser()
    },
  })

  if (!schoolRole) {
    return null
  }

  const { school } = schoolRole

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 3 }}>
        <Form
          schema={schema}
          onSubmit={async (data, { addressShown, ...delta }) => {
            const address = toggleGroup(addressShown, data.address)
            const input = { ...delta, address }
            console.log(input)
            await update({ variables: { input } })
          }}
        >
          <Stack>
            <FormImage name="cover" label="Cover" defaultValue={school.cover?.url} />
            <FormImage name="logo" label="Logo" type="avatar" defaultValue={school.logo?.url} />
            <FormText name="name" label="Name" required defaultValue={school.name} />
            <FormText name="phone" label="Phone" type="phone" required defaultValue={school.phone} />
            <FormText name="password" label="Password" type="password" required />
            <FormToggleGroup
              label="Address"
              name="addressShown"
              defaultValue={!!school.address}
              title="I want to enter an address"
            >
              <Stack>
                <FormText name="address.street" label="Street" required defaultValue={school.address?.street} />
                <FormText name="address.city" label="City" required defaultValue={school.address?.city} />
                <FormText name="address.state" label="State" required defaultValue={school.address?.state} />
                <FormText name="address.zip" label="ZIP" required defaultValue={school.address?.zip} />
              </Stack>
            </FormToggleGroup>
            <FormError />
            <FormButton />
          </Stack>
        </Form>
      </Paper>
    </Container>
  )
}

export default withDashboardLayout(FormPage, {
  title: 'Form',
})
