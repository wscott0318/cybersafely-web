import { UserRoleTypeEnum } from '../schema'

interface UserRole {
  id: string
  type: UserRoleTypeEnum
  __typename?: string | undefined
}

export const checkIfRolesSame = (roles: Array<UserRole> | undefined) => {
  if (!roles || !roles.length) return false

  const temp = roles[0]

  for (let i = 0; i < roles.length; i++) {
    if (temp.type !== roles[i].type) return false
  }

  return true
}

export const filterUserRoles = (roles: Array<UserRole> | undefined) => {
  if (!roles || !roles.length) return []

  const resArray = [] as Array<UserRole>

  roles.forEach((role: UserRole) => {
    const index = resArray.findIndex((item: UserRole) => item.type === role.type)

    if (index === -1) resArray.push(role)
  })

  return resArray
}
