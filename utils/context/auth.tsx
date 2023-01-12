import { createContext, useCallback, useContext, useMemo } from 'react'
import { ProfileQuery } from '../../types/graphql'

type AuthContext = {
  user: ProfileQuery['profile']
  refetch: () => void
}

const AuthContext = createContext<Partial<AuthContext>>({})

type AuthContextProviderProps = {
  children: JSX.Element | JSX.Element[]
} & AuthContext

export function AuthContextProvider(props: AuthContextProviderProps) {
  const { children, ...context } = props

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}

export function useUser() {
  const { user, refetch } = useContext(AuthContext)

  const logout = useCallback(() => {
    //
  }, [])

  if (!user) {
    throw new Error('User was not found')
  }

  const membership = useMemo(() => {
    if (localStorage) {
      const orgId = localStorage.getItem('orgId')

      if (orgId) {
        return user.memberships.find((e) => e.organization.id === orgId)
      }
    }
  }, [user])

  return { user, membership, logout, refetch: refetch! }
}
