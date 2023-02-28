import { Box } from '@mui/material'
import { namedOperations, useRemoveUserRoleMutation, UserRole as UserRoleType } from '../../schema'
import { useAlert } from '../../utils/context/alert'
import { UserRole, userRoleDisplayText } from './UserRole'

type UserRolesProps = {
  roles: Pick<UserRoleType, 'id' | 'type' | 'status'>[]
  canRemove?: boolean
}

export function UserRoles({ roles, canRemove }: UserRolesProps) {
  const { pushAlert } = useAlert()

  const [removeUserRole] = useRemoveUserRoleMutation({
    refetchQueries: [namedOperations.Query.users],
  })

  return (
    <>
      {roles.map(({ id, type, status }) => (
        <Box key={id} mr={0.5}>
          <UserRole
            type={type}
            status={status}
            onDelete={
              canRemove
                ? () => {
                    pushAlert({
                      type: 'confirm',
                      title: 'Remove Role',
                      message: `Are you sure you want to remove role "${userRoleDisplayText(type)}"?`,
                      confirm: () => {
                        removeUserRole({ variables: { id } })
                      },
                    })
                  }
                : undefined
            }
          />
        </Box>
      ))}
    </>
  )
}
