import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { FormInputProps, useFormInput } from './Form'

type Props<M extends boolean> = {
  label: string
  required?: boolean
  multiple?: M
  options: { title: string; value: string }[]
}

export function FormSelect<M extends boolean>(props: FormInputProps<M extends true ? string[] : string, Props<M>>) {
  const { value, onChange, disabled, error, hasError } = useFormInput(props.name, props.defaultValue)

  return (
    <FormControl fullWidth variant="standard" error={hasError} disabled={disabled} required={props.required}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        label={props.label}
        multiple={props.multiple}
        onChange={(e) => onChange(e.target.value as any)}
        value={props.multiple ? value ?? [] : value ?? ''}
      >
        {props.options.map((option, index) => (
          <MenuItem key={String(index)} value={option.value}>
            {option.title}
          </MenuItem>
        ))}
      </Select>
      {hasError && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}
