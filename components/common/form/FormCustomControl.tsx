import { FormControl, FormHelperText, InputLabel } from '@mui/material'
import React from 'react'

type FormCustomControlProps = {
  required?: boolean
  disabled?: boolean
  error?: boolean
  label: string
  helperText?: string
  children: React.ReactNode
}

export function FormCustomControl(props: FormCustomControlProps) {
  return (
    <FormControl
      fullWidth
      sx={{ pt: 2 }}
      variant="standard"
      error={props.error}
      disabled={props.disabled}
      required={props.required}
    >
      <InputLabel shrink disableAnimation>
        {props.label}
      </InputLabel>
      {props.children}
      {!!props.helperText && <FormHelperText>{props.helperText}</FormHelperText>}
    </FormControl>
  )
}
