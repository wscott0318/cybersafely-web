import RemoveIcon from '@mui/icons-material/PersonRemoveOutlined'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { namedOperations, useRemoveParentMutation } from '../../types/graphql'
import { useAlert } from '../../utils/context/alert'
import { DropDownButton } from '../common/DropDownButton'

type ParentActionsProps = {
  parentId: string
  childId: string
}

export function ParentActions({ parentId, childId }: ParentActionsProps) {
  const { pushAlert } = useAlert()

  const [removeParent] = useRemoveParentMutation({
    variables: { id: parentId, childId },
    refetchQueries: [namedOperations.Query.parents],
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
              removeParent()
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
