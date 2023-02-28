import RemoveIcon from '@mui/icons-material/PersonRemoveOutlined'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { namedOperations, useRemoveUserRoleMutation } from '../../schema'
import { useAlert } from '../../utils/context/alert'
import { DropDownButton } from '../common/DropDownButton'

type ParentActionsProps = {
  userRoleId: string
}

export function ParentActions({ userRoleId }: ParentActionsProps) {
  const { pushAlert } = useAlert()

  const [removeUserRole] = useRemoveUserRoleMutation({
    variables: { id: userRoleId },
    refetchQueries: [namedOperations.Query.users],
  })

  return (
    <DropDownButton title="Actions" variant="text" size="small">
      <MenuItem
        sx={(theme) => ({
          color: theme.palette.error.main,
        })}
        onClick={() => {
          pushAlert({
            type: 'confirm',
            title: 'Remove Parent',
            message: 'Are you sure you want to remove this parent?',
            confirm: () => {
              removeUserRole()
            },
          })
        }}
      >
        <ListItemIcon>
          <RemoveIcon fontSize="small" color="error" />
        </ListItemIcon>
        <ListItemText>Remove Parent</ListItemText>
      </MenuItem>
    </DropDownButton>
  )
}
