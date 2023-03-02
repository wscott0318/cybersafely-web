import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { z } from 'zod'
import { CoverLayout } from '../../../../components/common/CoverLayout'
import { Form } from '../../../../components/common/form/Form'
import { FormText } from '../../../../components/common/form/FormText'
import { checkPasswordStrength } from '../../../../components/common/PasswordStrength'
import { addIssue } from '../../../../helpers/zod'
import { useResetPasswordMutation } from '../../../../schema'

const schema = z
  .object({
    password: z
      .string()
      .min(4)
      .refine((password) => checkPasswordStrength(password) > 50, 'Password is too weak'),
    repeatPassword: z.string(),
  })
  .superRefine(({ password, repeatPassword }, ctx) => {
    if (password !== repeatPassword) {
      addIssue('repeatNewPassword', "The passwords don't match", ctx)
    }
  })

type Props = {
  token: string
}

export default function ResetPassword({ token }: Props) {
  const router = useRouter()

  const [resetPassword] = useResetPasswordMutation({
    onCompleted: () => {
      router.push('/auth/login')
    },
  })

  return (
    <CoverLayout>
      <Form
        schema={schema}
        onSubmit={async ({ password }) => {
          await resetPassword({ variables: { input: { token, password } } })
        }}
      >
        <FormText name="password" label="New Password" type="password" />
        <FormText name="repeatPassword" label="Repeat Password" type="password" hidePasswordStrength />
      </Form>
    </CoverLayout>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const token = ctx.params!.token as string
  return { props: { token } }
}
