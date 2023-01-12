import { createContext, useCallback, useContext } from 'react'
import { MeQuery } from '../../types/graphql'

type AuthContext = {
  user: MeQuery['me']
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

  return { user, logout, refetch: refetch! }
}
