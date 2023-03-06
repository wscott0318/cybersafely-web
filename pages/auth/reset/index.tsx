import { z } from 'zod'
import { CoverLayout } from '../../../components/common/CoverLayout'
import { Form } from '../../../components/common/form/Form'
import { FormText } from '../../../components/common/form/FormText'
import { useForgotPasswordMutation } from '../../../schema'
import { useAlert } from '../../../utils/context/alert'

const schema = z.object({
  email: z.string().email(),
})

export default function ResetPassword() {
  const { pushAlert } = useAlert()

  const [forgotPassword] = useForgotPasswordMutation({
    onCompleted: () => {
      pushAlert({
        type: 'alert',
        title: 'Success',
        message: 'Please check your inbox and follow the instructions',
      })
    },
  })

  return (
    <CoverLayout>
      <Form
        schema={schema}
        onSubmit={async (variables) => {
          await forgotPassword({ variables })
        }}
      >
        <FormText name="email" label="E-mail" type="email" required />
      </Form>
    </CoverLayout>
  )
}
