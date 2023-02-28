import { Alert } from '@mui/material'
import { useMemo } from 'react'
import { FORM_ERROR_KEY, useForm } from './Form'

export function FormError() {
  const { errors } = useForm()

  const error = useMemo(() => {
    return errors[FORM_ERROR_KEY]
  }, [errors])

  if (!error) {
    return null
  }

  return (
    <Alert severity="error" sx={{ borderRadius: 1 }}>
      {error}
    </Alert>
  )
}
