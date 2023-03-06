import { z } from 'zod'
import { Form } from '../common/form/Form'
import { FormText } from '../common/form/FormText'

const schema = z.object({
  name: z.string().min(4),
})

type CreateSchoolFormProps = {
  onSubmit: (value: z.infer<typeof schema>) => void
}

export function CreateSchoolForm(props: CreateSchoolFormProps) {
  return (
    <Form schema={schema} onSubmit={(data) => props.onSubmit(data)}>
      <FormText name="name" label="Name" required />
    </Form>
  )
}
