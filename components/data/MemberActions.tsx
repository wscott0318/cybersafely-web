import { MenuItem } from '@mui/material'
import { namedOperations, useRemoveMemberMutation } from '../../types/graphql'
import { useAlert } from '../../utils/context/alert'
import { DropDownButton } from '../common/DropDownButton'

type MemberActionsProps = {
  memberId: string
  teamId?: string
}

export function MemberActions({ memberId, teamId }: MemberActionsProps) {
  const { pushAlert } = useAlert()

  const [removeMember] = useRemoveMemberMutation({
    context: { teamId },
    variables: { id: memberId },
    refetchQueries: [namedOperations.Query.members],
  })

  return (
    <DropDownButton title="Actions" variant="text" size="small">
      <MenuItem
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
        Remove Member
      </MenuItem>
    </DropDownButton>
  )
}
