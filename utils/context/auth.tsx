import { useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'
import { createContext, useCallback, useContext, useMemo } from 'react'
import { ProfileQuery, Role, SchoolRole } from '../../types/graphql'
import { StorageManager } from '../storage'

type AuthContext = {
  user: ProfileQuery['profile']
  role: Role
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
  const router = useRouter()
  const client = useApolloClient()
  const context = useContext(AuthContext)

  const logout = useCallback(async () => {
    StorageManager.clear()
    sessionStorage.clear()
    await client.clearStore()
    router.push('/auth/login')
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

  const role = useMemo(() => {
    if (context?.user) {
      const schoolId = StorageManager.get('schoolId')

      if (schoolId) {
        const role = context.user.roles.find(
          (e) => e.role === 'ADMIN' || e.role === 'COACH' || e.role === 'ATHLETE'
        ) as SchoolRole | undefined

        if (role && role.school.id === schoolId) {
          return role
        }
      }
    }
  }, [context?.user])

  return role
}
