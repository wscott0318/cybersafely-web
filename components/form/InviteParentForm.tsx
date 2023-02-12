import { Stack, TextField } from '@mui/material'
import { forwardRef, useImperativeHandle } from 'react'
import { z } from 'zod'
import { useForm } from '../../helpers/form'

const schema = z.object({
  email: z.string().email(),
  relation: z.string().optional(),
})

type InviteParentFormRefProps = {
  onSubmit: (callback: (value: z.infer<typeof schema>) => void) => void
}

export const InviteParentForm = forwardRef<InviteParentFormRefProps>(function Wrapped(props, ref) {
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
      <TextField
        fullWidth
        margin="dense"
        label="Relation"
        variant="standard"
        error={form.hasError('relation')}
        value={form.value.relation ?? ''}
        helperText={form.getError('relation')}
        onChange={(e) => form.onChange('relation', e.target.value)}
      />
    </Stack>
  )
})
