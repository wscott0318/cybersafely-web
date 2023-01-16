import { GridActionsCellItem } from '@mui/x-data-grid'
import { namedOperations, useRemoveMemberMutation } from '../../types/graphql'
import { useAlert } from '../../utils/context/alert'

export function getMemberActions(memberId: string, teamId?: string) {
  const { pushAlert } = useAlert()

  const [removeMember] = useRemoveMemberMutation({
    context: { teamId },
    variables: { id: memberId },
    refetchQueries: [namedOperations.Query.members],
  })

  return [
    <GridActionsCellItem
      showInMenu
      label="Remove Member"
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
    />,
  ]
}
