import { UserRoleTypeEnum } from '../schema'

type UserRole = {
  id: string
  type: UserRoleTypeEnum
  __typename?: string | undefined
}

export const isEveryElementSameInArray = (elementsArray: Array<any>) => {
  if (!elementsArray || !elementsArray.length) return false

  const el = elementsArray[0]

  for (let i = 1; i < elementsArray.length; i++) {
    if (el !== elementsArray[i]) return false
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
