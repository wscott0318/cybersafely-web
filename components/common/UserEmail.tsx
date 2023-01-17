import VerifiedIcon from '@mui/icons-material/Verified'
import { Tooltip } from '@mui/material'

type UserEmailProps = {
  email: string
  emailConfirmed: boolean
}

export function UserEmail({ email, emailConfirmed }: UserEmailProps) {
  return (
    <>
      <Tooltip title={emailConfirmed ? 'E-mail is confirmed' : 'E-mail is not confirmed'}>
        <VerifiedIcon color={emailConfirmed ? 'primary' : 'disabled'} sx={{ mr: 0.5 }} fontSize="small" />
      </Tooltip>
      {email}
    </>
  )
}
