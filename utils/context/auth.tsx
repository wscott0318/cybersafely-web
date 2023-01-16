import { useRouter } from 'next/router'
import { createContext, useCallback, useContext, useMemo } from 'react'
import { ProfileQuery, TeamRole } from '../../types/graphql'

type AuthContext = {
  user: ProfileQuery['profile']
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
  const context = useContext(AuthContext)

  const logout = useCallback(() => {
    localStorage.clear()
    sessionStorage.clear()
    router.push('/auth/login')
  }, [])

  if (!context) {
    throw new Error('Auth parent context not found')
  }

  return { ...context, logout }
}

export function useTeam() {
  const context = useContext(AuthContext)

  const role = useMemo(() => {
    if (context?.user && localStorage) {
      const teamId = localStorage.getItem('teamId')

      if (teamId) {
        const role = context.user.roles.find((e) => e.role === 'COACH' || e.role === 'ATHLETE') as TeamRole | undefined

        if (role && role.team.id === teamId) {
          return role
        }
      }
    }
  }, [context?.user])

  return role
}
