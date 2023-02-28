import { Checkbox, Collapse, FormControlLabel, Stack } from '@mui/material'
import { FormInputProps, useFormInput } from './Form'
import { FormCustomControl } from './FormCustomControl'

type Props = {
  label: string
  title: string
  children: React.ReactNode
}

export function FormToggleGroup(props: FormInputProps<boolean, Props>) {
  const { value, onChange, disabled, error, hasError } = useFormInput(props.name, props.defaultValue)

  return (
    <Stack spacing={1}>
      <FormCustomControl label={props.label} disabled={disabled} error={hasError} helperText={error}>
        <FormControlLabel
          label={props.title}
          control={<Checkbox size="small" checked={value ?? false} onChange={(_, value) => onChange(value)} />}
        />
      </FormCustomControl>
      <Collapse in={value} mountOnEnter unmountOnExit>
        {props.children}
      </Collapse>
    </Stack>
  )
}
