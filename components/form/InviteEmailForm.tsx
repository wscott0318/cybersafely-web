import { Stack, TextField } from '@mui/material'
import { forwardRef, useImperativeHandle } from 'react'
import { z } from 'zod'
import { useForm } from '../../helpers/form'

const schema = z.object({
  email: z.string().email(),
})

type InviteEmailFormRefProps = {
  onSubmit: (callback: (value: z.infer<typeof schema>) => void) => void
}

export const InviteEmailForm = forwardRef<InviteEmailFormRefProps>(function Wrapped(props, ref) {
  const form = useForm(schema)

  useImperativeHandle(ref, () => ({ onSubmit: form.didSubmit }), [form.didSubmit])

  return (
    <Stack spacing={1}>
      <TextField
        required
        autoFocus
        fullWidth
        type="email"
        label="E-mail"
        margin="dense"
        variant="standard"
        error={form.hasError('email')}
        value={form.value.email ?? ''}
        helperText={form.getError('email')}
        onChange={(e) => form.onChange('email', e.target.value)}
      />
    </Stack>
  )
})
