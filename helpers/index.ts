interface userRole {
  id: string
  type: string
  __typename?: string | undefined
}

export const checkIfRolesSame = (roles: Array<userRole> | undefined) => {
  if (!roles || !roles.length) return false

  const temp = roles[0]

  for (let i = 0; i < roles.length; i++) {
    if (temp.type !== roles[i].type) return false
  }

  return true
}

export const filterUserRoles = (roles: Array<userRole> | undefined) => {
  if (!roles || !roles.length) return []

  const resArray = [] as Array<userRole>

  roles.forEach((role: userRole) => {
    const index = resArray.findIndex((item: userRole) => item.type === role.type)

    if (index === -1) resArray.push(role)
  })

  return resArray
}
