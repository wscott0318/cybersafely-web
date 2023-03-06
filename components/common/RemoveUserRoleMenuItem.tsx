import RemoveIcon from '@mui/icons-material/PersonRemoveOutlined'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { namedOperations, useRemoveUserRoleMutation } from '../../schema'
import { useAlert } from '../../utils/context/alert'

type RemoveUserRoleMenuItemProps = {
  title: string
  userRoleId: string
}

export function RemoveUserRoleMenuItem({ title, userRoleId }: RemoveUserRoleMenuItemProps) {
  const { pushAlert } = useAlert()

  const [removeUserRole] = useRemoveUserRoleMutation({
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
          title: 'Remove',
          message: 'Are you sure you want to remove?',
          confirm: () => {
            removeUserRole()
          },
        })
      }}
    >
      <ListItemIcon>
        <RemoveIcon fontSize="small" color="error" />
      </ListItemIcon>
      <ListItemText>{title}</ListItemText>
    </MenuItem>
  )
}
