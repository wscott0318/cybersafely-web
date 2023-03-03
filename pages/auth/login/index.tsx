import { Divider, Link, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { z } from 'zod'
import { CoverLayout } from '../../../components/common/CoverLayout'
import { Form } from '../../../components/common/form/Form'
import { FormText } from '../../../components/common/form/FormText'
import { NextLink } from '../../../components/common/NextLink'
import { useLoginWithEmailMutation, useSettingsQuery } from '../../../schema'
import { StorageManager } from '../../../utils/storage'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
})

function RegisterButton() {
  const { data } = useSettingsQuery()

  if (!data?.settings.enableSignUps) {
    return null
  }

  return (
    <>
      <Divider />
      <Typography>
        Don’t have an account?{' '}
        <NextLink href="/auth/register">
          <Link>Register</Link>
        </NextLink>
      </Typography>
    </>
  )
}

export default function Login() {
  const router = useRouter()

  const [login] = useLoginWithEmailMutation({
    onCompleted: async (data, options) => {
      const { token, user } = data.loginWithEmail

      StorageManager.clear()
      StorageManager.set('token', token)
      StorageManager.set('userId', user.id)

      await options?.client?.clearStore()

      router.push('/dashboard')
    },
  })

  return (
    <CoverLayout>
      <Stack>
        <Form
          schema={schema}
          onSubmit={async (input) => {
            await login({ variables: { input } })
          }}
        >
          <FormText name="email" label="E-mail" type="email" required />
          <FormText name="password" label="Password" type="password" required hidePasswordStrength />
        </Form>
        <NextLink href="/auth/reset">
          <Link textAlign="right">Forgot password?</Link>
        </NextLink>
        <RegisterButton />
      </Stack>
    </CoverLayout>
  )
}
