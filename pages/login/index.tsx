import { useMemo, useState } from 'react'
import { LoginMutationVariables, useLoginMutation } from '../../types/graphql'

type LoginForm = {
  email: string
  password: string
}

export default function Login() {
  const [form, setForm] = useState<LoginForm>()

  const variables = useMemo<LoginMutationVariables>(() => {
    return { ...form! }
  }, [form])

  const [login] = useLoginMutation({ variables })

  return null
}
