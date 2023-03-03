import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { z } from 'zod'
import { CoverLayout } from '../../../../components/common/CoverLayout'
import { Form } from '../../../../components/common/form/Form'
import { FormText } from '../../../../components/common/form/FormText'
import { checkPasswordStrength } from '../../../../components/common/PasswordStrength'
import { addIssue } from '../../../../helpers/zod'
import { useFinalizeAccountMutation } from '../../../../schema'

const schema = z
  .object({
    name: z.string().min(4),
    password: z
      .string()
      .min(4)
      .refine((password) => checkPasswordStrength(password) > 50, 'Password is too weak'),
    repeatPassword: z.string(),
  })
  .superRefine(({ password, repeatPassword }, ctx) => {
    if (password !== repeatPassword) {
      addIssue('repeatPassword', "The passwords don't match", ctx)
    }
  })

type Props = {
  token: string
}

export default function Activate({ token }: Props) {
  const router = useRouter()

  const [activate] = useFinalizeAccountMutation({
    onCompleted() {
      router.push('/auth/login')
    },
  })

  return (
    <CoverLayout>
      <Form
        schema={schema}
        onSubmit={async ({ password, name }) => {
          await activate({ variables: { input: { token, password, name } } })
        }}
      >
        <FormText name="name" label="Name" required />
        <FormText name="password" label="Password" type="password" required />
        <FormText name="repeatPassword" label="Repeat Password" type="password" required hidePasswordStrength />
      </Form>
    </CoverLayout>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const token = ctx.params!.token as string
  return { props: { token } }
}
