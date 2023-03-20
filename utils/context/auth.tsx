import { createContext, useCallback, useContext, useMemo } from 'react'
import { MyUserQuery, SchoolRole, UserRoleTypeEnum } from '../../schema'
import { StorageManager } from '../storage'

type AuthContext = {
  user: MyUserQuery['user']
  role: UserRoleTypeEnum | undefined
  refetchUser: () => Promise<void>
}

const AuthContext = createContext<AuthContext | null>(null)

type AuthContextProviderProps = {
  children: JSX.Element | JSX.Element[]
} & AuthContext

export function AuthContextProvider(props: AuthContextProviderProps) {
  const { children, ...context } = props

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}

export function useUser() {
  const context = useContext(AuthContext)

  const logout = useCallback(async () => {
    StorageManager.clear()
    sessionStorage.clear()
    document.location = '/auth/login'
  }, [])

  const refetchUser = useCallback(async () => {
    await context?.refetchUser()
  }, [])

  if (!context) {
    throw new Error('Auth parent context not found')
  }

  return { ...context, logout, refetchUser }
}

export function useSchoolRole() {
  const context = useContext(AuthContext)

  const userRole = useMemo(() => {
    if (context?.user) {
      const schoolId = StorageManager.get('schoolId')

      if (schoolId) {
        const userRole = context.user.roles.find((e) => ['ADMIN', 'COACH', 'ATHLETE'].includes(e.type)) as
          | SchoolRole
          | undefined

        if (userRole && userRole.school.id === schoolId) {
          return userRole
        }
      }
    }
  }, [context?.user])

  return userRole
}
