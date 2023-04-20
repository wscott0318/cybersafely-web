import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@mui/material'
import { useFormContext } from 'react-hook-form'

export function FormCheckbox({ name, label }: { name: string; label: React.ReactNode }) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <FormControl variant="standard" error={!!errors[name]}>
      <FormControlLabel control={<Checkbox {...register(name)} />} label={label} />
      {!!errors[name] && <FormHelperText>{errors[name]?.message as string}</FormHelperText>}
    </FormControl>
  )
}
