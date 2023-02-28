import { TextField } from '@mui/material'
import { ChangeEvent, forwardRef, useCallback } from 'react'
import PhoneInput from 'react-phone-number-input/input'
import { PasswordStrength } from '../PasswordStrength'
import { FormInputProps, useFormInput } from './Form'

const CustomPhoneInput = forwardRef<any, any>(function CustomPhoneInput(props, ref) {
  const { onChange, ...rest } = props
  return (
    <PhoneInput
      {...rest}
      ref={ref}
      country="US"
      onChange={(value) => {
        if (typeof value === 'string') {
          onChange({ target: { value } })
        } else {
          onChange({ target: { value: '' } })
        }
      }}
    />
  )
})

type Props = {
  label: string
  required?: boolean
  type?: 'email' | 'password' | 'phone' | 'text' | 'textarea'
}

export function FormText(props: FormInputProps<string | null, Props>) {
  const { value, onChange, disabled, error, hasError } = useFormInput(props.name, props.defaultValue)

  const onChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!!e.target.value) {
        onChange(e.target.value)
      } else {
        onChange(null)
      }
    },
    [onChange]
  )

  switch (props.type) {
    case 'phone':
      return (
        <TextField
          fullWidth
          error={hasError}
          type={props.type}
          helperText={error}
          label={props.label}
          value={value ?? ''}
          disabled={disabled}
          onChange={onChanged}
          required={props.required}
          InputProps={{ inputComponent: CustomPhoneInput }}
        />
      )

    case 'textarea':
      return (
        <TextField
          fullWidth
          multiline
          error={hasError}
          type={props.type}
          helperText={error}
          label={props.label}
          value={value ?? ''}
          disabled={disabled}
          onChange={onChanged}
          required={props.required}
        />
      )

    case 'password':
      return (
        <TextField
          fullWidth
          error={hasError}
          type="password"
          helperText={error}
          label={props.label}
          value={value ?? ''}
          disabled={disabled}
          onChange={onChanged}
          required={props.required}
          InputProps={{ endAdornment: <PasswordStrength password={value} /> }}
        />
      )

    default:
      return (
        <TextField
          fullWidth
          error={hasError}
          type={props.type}
          helperText={error}
          label={props.label}
          value={value ?? ''}
          disabled={disabled}
          onChange={onChanged}
          required={props.required}
        />
      )
  }
}
