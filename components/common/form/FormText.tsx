import { TextField } from '@mui/material'
import { forwardRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import PhoneInput from 'react-phone-number-input/input'
import { PasswordStrength } from '../PasswordStrength'

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

type FormTextProps = {
  name: string
  label: string
  type?: 'email' | 'password' | 'phone'
  hidePasswordStrength?: boolean
  required?: boolean
}

function PasswordStrengthAdornment(props: FormTextProps) {
  const { watch } = useFormContext()

  const value = watch(props.name)

  return <PasswordStrength password={value} />
}

export function FormText(props: FormTextProps) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext()

  if (props.type === 'phone') {
    return (
      <Controller
        name={props.name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <TextField
            value={value}
            type={props.type}
            label={props.label}
            onChange={onChange}
            required={props.required}
            error={!!errors[props.name]}
            InputProps={{ inputComponent: CustomPhoneInput }}
            helperText={errors[props.name]?.message as string | undefined}
          />
        )}
      />
    )
  }

  return (
    <TextField
      {...register(props.name)}
      type={props.type}
      label={props.label}
      required={props.required}
      error={!!errors[props.name]}
      helperText={errors[props.name]?.message as string | undefined}
      InputProps={{
        endAdornment:
          props.type === 'password' && !props.hidePasswordStrength ? (
            <PasswordStrengthAdornment {...props} />
          ) : undefined,
      }}
    />
  )
}
546545
