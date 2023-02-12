import RemoveIcon from '@mui/icons-material/PersonRemoveOutlined'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { namedOperations, useRemoveMemberMutation } from '../../types/graphql'
import { useAlert } from '../../utils/context/alert'
import { DropDownButton } from '../common/DropDownButton'

type MemberActionsProps = {
  memberId: string
}

export function MemberActions({ memberId }: MemberActionsProps) {
  const { pushAlert } = useAlert()

  const [removeMember] = useRemoveMemberMutation({
    variables: { id: memberId },
    refetchQueries: [namedOperations.Query.members],
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
              removeMember()
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
