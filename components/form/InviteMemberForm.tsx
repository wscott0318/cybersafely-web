import { FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import { forwardRef, useImperativeHandle } from 'react'
import { z } from 'zod'
import { useForm } from '../../helpers/form'
import { useTeamRole } from '../../utils/context/auth'

const schema = z.object({
  email: z.string().email(),
  role: z.enum(['ADMIN', 'COACH', 'ATHLETE']),
})

type InviteMemberFormRefProps = {
  onSubmit: (callback: (value: z.infer<typeof schema>) => void) => void
}

export const InviteMemberForm = forwardRef<InviteMemberFormRefProps>(function Wrapped(props, ref) {
  const form = useForm(schema)
  const teamRole = useTeamRole()

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
      <FormControl fullWidth required variant="standard" margin="dense" error={form.hasError('role')}>
        <InputLabel>Role</InputLabel>
        <Select
          required
          fullWidth
          label="Role"
          margin="dense"
          variant="standard"
          value={form.value.role ?? ''}
          onChange={(e) => form.onChange('role', e.target.value as any)}
        >
          {teamRole?.role === 'ADMIN' && <MenuItem value="ADMIN">Admin</MenuItem>}
          <MenuItem value="COACH">Coach</MenuItem>
          <MenuItem value="ATHLETE">Athlete</MenuItem>
        </Select>
        {form.hasError('role') && <FormHelperText>{form.getError('role')}</FormHelperText>}
      </FormControl>
    </Stack>
  )
})
