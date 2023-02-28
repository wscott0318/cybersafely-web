import { TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useCallback, useMemo } from 'react'
import { FormInputProps, useFormInput } from './Form'

type Props = {
  label: string
  required?: boolean
}

export function FormDate(props: FormInputProps<string | null, Props>) {
  const { value, onChange, disabled, error, hasError } = useFormInput(props.name, props.defaultValue)

  const date = useMemo(() => {
    if (typeof value === 'string') return new Date(value)
    return null
  }, [value])

  const onChanged = useCallback(
    (date: Date | null) => {
      if (date) {
        try {
          onChange(date.toISOString())
        } catch {}
      } else {
        onChange(null)
      }
    },
    [onChange]
  )

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        value={date}
        onChange={onChanged}
        PopperProps={{ placement: 'bottom-start' }}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            error={hasError}
            helperText={error}
            label={props.label}
            disabled={disabled}
            required={props.required}
          />
        )}
      />
    </LocalizationProvider>
  )
}
