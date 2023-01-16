import { GridActionsCellItem } from '@mui/x-data-grid'
import { namedOperations, useRemoveParentMutation } from '../../types/graphql'
import { useAlert } from '../../utils/context/alert'

export function getParentActions(parentId: string, childId: string, teamId?: string) {
  const { pushAlert } = useAlert()

  const [removeParent] = useRemoveParentMutation({
    context: { teamId },
    variables: { id: parentId, childId },
    refetchQueries: [namedOperations.Query.parents],
  })

  return [
    <GridActionsCellItem
      showInMenu
      label="Remove Parent"
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
    />,
  ]
}
