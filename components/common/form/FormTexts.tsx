import IconAdd from '@mui/icons-material/AddCircleOutline'
import IconRemove from '@mui/icons-material/RemoveCircleOutline'
import { Button, IconButton, Stack, TextField, TextFieldProps } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

type FormTextsProps = {
  name: string
  label: string
  type?: 'email'
  inputProps?: TextFieldProps
}

export function FormTexts(props: FormTextsProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const error = (Array.isArray(errors[props.name]) ? errors[props.name] : undefined) as
    | { message: string }[]
    | undefined

  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <Stack>
          {(value as string[]).map((item, index) => (
            <Stack direction="row" alignItems="center">
              <TextField
                {...props.inputProps}
                fullWidth
                value={item}
                type={props.type}
                error={!!error?.[index]}
                helperText={error?.[index].message}
                label={props.label + ' #' + (index + 1)}
                onChange={(e) => {
                  const newValue = value.map((it: string, ind: number) => (ind === index ? e.target.value : it))
                  onChange(newValue)
                }}
              />
              <IconButton
                color="error"
                onClick={() => onChange(value.filter((it: string, ind: number) => ind !== index))}
              >
                <IconRemove />
              </IconButton>
            </Stack>
          ))}
          <Button
            variant="text"
            startIcon={<IconAdd />}
            sx={{ alignSelf: 'flex-start' }}
            onClick={() => onChange([...value, ''])}
          >
            Add Another Parent
          </Button>
        </Stack>
      )}
    />
  )
}
