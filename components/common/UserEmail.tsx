import VerifiedIcon from '@mui/icons-material/Verified'
import { Tooltip } from '@mui/material'

type UserEmailProps = {
  email: string
  emailConfirmed: boolean
}

export function UserEmail(props: UserEmailProps) {
  const { email, emailConfirmed } = props

  return (
    <>
      <Tooltip title={emailConfirmed ? 'E-mail is confirmed' : 'E-mail is not confirmed'}>
        <VerifiedIcon color={emailConfirmed ? 'primary' : 'disabled'} sx={{ mr: 0.5 }} />
      </Tooltip>
      {email}
    </>
  )
}
