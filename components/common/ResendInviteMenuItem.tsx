import SendIcon from '@mui/icons-material/Send'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { namedOperations, useResendUserRoleInviteMutation } from '../../schema'
import { useAlert } from '../../utils/context/alert'

type ResendInviteMenuItemProps = {
  title: string
  userRoleId: string
}

export function ResendInviteMenuItem({ title, userRoleId }: ResendInviteMenuItemProps) {
  const { pushAlert } = useAlert()

  const [resendInvite] = useResendUserRoleInviteMutation({
    variables: { id: userRoleId },
    refetchQueries: [namedOperations.Query.users],
  })

  return (
    <MenuItem
      sx={(theme) => ({
        color: theme.palette.error.main,
      })}
      onClick={() => {
        pushAlert({
          type: 'confirm',
          title: 'Resend',
          message: 'Are you sure you want to resend?',
          confirm: () => {
            resendInvite()
          },
        })
      }}
    >
      <ListItemIcon>
        <SendIcon fontSize="small" color="error" />
      </ListItemIcon>
      <ListItemText>{title}</ListItemText>
    </MenuItem>
  )
}
