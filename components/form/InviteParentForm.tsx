import { Stack, TextField } from '@mui/material'
import { forwardRef, useImperativeHandle, useState } from 'react'

type InviteParentFormRefProps = {
  email: string
  relation: string
}

export const InviteParentForm = forwardRef<InviteParentFormRefProps>((props, ref) => {
  const [email, setEmail] = useState('')
  const [relation, setRelation] = useState('')

  useImperativeHandle(ref, () => ({ email, relation }), [email, relation])

  return (
    <Stack spacing={1}>
      <TextField
        required
        autoFocus
        fullWidth
        type="email"
        value={email}
        label="E-mail"
        margin="dense"
        variant="standard"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        margin="dense"
        label="Relation"
        value={relation}
        variant="standard"
        onChange={(e) => setRelation(e.target.value)}
      />
    </Stack>
  )
})
