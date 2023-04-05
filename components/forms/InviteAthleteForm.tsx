import { z } from 'zod'
import { Form } from '../common/form/Form'
import { FormText } from '../common/form/FormText'

const schema = z.object({
  email: z.string().email(),
  parentEmail: z.string().email(),
})

type InviteAthleteFormProps = {
  onSubmit: (value: z.infer<typeof schema>) => void
}

export function InviteAthleteForm(props: InviteAthleteFormProps) {
  return (
    <Form schema={schema} onSubmit={(data) => props.onSubmit(data)}>
      <FormText name="email" label="E-mail" type="email" required />
      <FormText name="parentEmail" label="Parent E-mail" type="email" required />
    </Form>
  )
}
