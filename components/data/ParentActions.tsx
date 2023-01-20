import { MenuItem } from '@mui/material'
import { namedOperations, useRemoveParentMutation } from '../../types/graphql'
import { useAlert } from '../../utils/context/alert'
import { DropDownButton } from '../common/DropDownButton'

type ParentActionsProps = {
  parentId: string
  childId: string
  teamId?: string
}

export function ParentActions({ parentId, childId, teamId }: ParentActionsProps) {
  const { pushAlert } = useAlert()

  const [removeParent] = useRemoveParentMutation({
    context: { teamId },
    variables: { id: parentId, childId },
    refetchQueries: [namedOperations.Query.parents],
  })

  return (
    <DropDownButton title="Actions" variant="text" size="small">
      <MenuItem
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
        Remove Parent
      </MenuItem>
    </DropDownButton>
  )
}
