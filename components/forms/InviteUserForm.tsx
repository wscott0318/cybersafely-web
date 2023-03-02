import { useMemo } from 'react'
import { z } from 'zod'
import { Form } from '../common/form/Form'
import { FormSelect } from '../common/form/FormSelect'
import { FormText } from '../common/form/FormText'

const schema = z.object({
  email: z.string().email(),
  type: z.enum(['STAFF', 'ADMIN', 'COACH', 'ATHLETE', 'PARENT']),
})

type Schema = z.infer<typeof schema>

type InviteUserFormProps = {
  onSubmit: (value: z.infer<typeof schema>) => void
  allow?: Schema['type'][]
}

const values: { value: Schema['type']; title: string }[] = [
  { value: 'STAFF', title: 'Staff' },
  { value: 'ADMIN', title: 'Admin' },
  { value: 'COACH', title: 'Coach' },
  { value: 'ATHLETE', title: 'Athlete' },
  { value: 'PARENT', title: 'Parent' },
]

export function InviteUserForm(props: InviteUserFormProps) {
  const options = useMemo(() => {
    if (!props.allow) return values
    return values.filter(({ value }) => props.allow!.includes(value))
  }, [props.allow])

  return (
    <Form
      schema={schema}
      onSubmit={(data) => props.onSubmit(data)}
      defaultValues={{ type: options.length === 1 ? options[0].value : undefined }}
    >
      <FormText name="email" label="E-mail" type="email" required />
      <FormSelect name="type" label="Role" options={options} required />
    </Form>
  )
}
