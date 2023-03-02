import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

type FormSelectProps = {
  name: string
  label: string
  required?: boolean
  options: { value: string; title: string }[]
}

export function FormSelect(props: FormSelectProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <FormControl
      variant="standard"
      required={props.required}
      error={!!errors[props.name]}
      disabled={props.options.length === 1}
    >
      <InputLabel>{props.label}</InputLabel>
      <Controller
        name={props.name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select value={value ?? ''} onChange={onChange}>
            {props.options.map((option, index) => (
              <MenuItem key={String(index)} value={option.value}>
                {option.title}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {!!errors[props.name] && <FormHelperText>{errors[props.name]?.message as string | undefined}</FormHelperText>}
    </FormControl>
  )
}
