import ImageIcon from '@mui/icons-material/Image'
import { Avatar, Box } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useFilePicker, useUpload } from '../../../utils/upload'
import { AspectImage } from '../AspectImage'
import { DeleteBadge } from '../DeleteBadge'
import { FormInputProps, useFormInput } from './Form'
import { FormCustomControl } from './FormCustomControl'

type Props = {
  label: string
  required?: boolean
  type?: 'avatar' | 'image'
  aspect?: number
}

export function FormImage(props: FormInputProps<string | null, Props>) {
  const [file, setFile] = useState<File>()
  const [src, setSrc] = useState<string>()

  const { pick } = useFilePicker()
  const { upload } = useUpload()

  const { value, onChange, disabled, error, hasError } = useFormInput(props.name, props.defaultValue, async () => {
    if (file) {
      const id = await upload(file)
      if (id) onChange(id)
    }

    return () => {
      setFile(undefined)
      onChange(undefined)
    }
  })

  useEffect(() => {
    if (file) {
      const src = URL.createObjectURL(file)
      setSrc(src)
      return () => URL.revokeObjectURL(src)
    } else if (value === null) {
      setSrc(undefined)
    } else if (typeof props.defaultValue === 'string') {
      setSrc(props.defaultValue)
    } else {
      setSrc(undefined)
    }
  }, [value, props.defaultValue, file])

  const onPick = useCallback(async () => {
    const file = await pick('image/*')
    if (file) setFile(file)
  }, [pick])

  const onClear = useCallback(async () => {
    setFile(undefined)
    if (typeof props.defaultValue === 'string') onChange(null)
  }, [props.defaultValue, onChange])

  switch (props.type) {
    case 'avatar':
      return (
        <FormCustomControl
          error={hasError}
          helperText={error}
          label={props.label}
          disabled={disabled}
          required={props.required}
        >
          <Box>
            <DeleteBadge overlap="circular" canDelete={!disabled && !!src} onDelete={onClear}>
              <Avatar
                src={src}
                onClick={!disabled ? onPick : undefined}
                sx={{ width: 100, height: 100, cursor: 'pointer', bgcolor: 'divider', color: 'text.disabled' }}
              >
                <ImageIcon />
              </Avatar>
            </DeleteBadge>
          </Box>
        </FormCustomControl>
      )

    default:
      return (
        <FormCustomControl
          error={hasError}
          helperText={error}
          label={props.label}
          disabled={disabled}
          required={props.required}
        >
          <DeleteBadge canDelete={!disabled && !!src} onDelete={onClear}>
            <AspectImage
              src={src}
              aspect={props.aspect}
              sx={{ cursor: 'pointer' }}
              onClick={!disabled ? onPick : undefined}
            />
          </DeleteBadge>
        </FormCustomControl>
      )
  }
}
