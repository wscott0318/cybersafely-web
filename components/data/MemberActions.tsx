import RemoveIcon from '@mui/icons-material/PersonRemoveOutlined'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { namedOperations, useRemoveUserRoleMutation } from '../../schema'
import { useAlert } from '../../utils/context/alert'
import { DropDownButton } from '../common/DropDownButton'

type MemberActionsProps = {
  userRoleId: string
}

export function MemberActions({ userRoleId }: MemberActionsProps) {
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
            title: 'Remove Member',
            message: 'Are you sure you want to remove this member?',
            confirm: () => {
              removeUserRole()
            },
          })
        }}
      >
        <ListItemIcon>
          <RemoveIcon fontSize="small" color="error" />
        </ListItemIcon>
        <ListItemText>Remove Member</ListItemText>
      </MenuItem>
    </DropDownButton>
  )
}
