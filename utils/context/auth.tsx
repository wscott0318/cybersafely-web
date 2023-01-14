import { useRouter } from 'next/router'
import { createContext, useCallback, useContext } from 'react'
import { ProfileQuery } from '../../types/graphql'

type AuthContext = {
  user: ProfileQuery['profile']
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
  const router = useRouter()
  const { user } = useContext(AuthContext)

  if (!user) {
    throw new Error('User was not found')
  }

  const logout = useCallback(() => {
    localStorage.clear()
    router.push('/auth/login')
  }, [])

  return { user, logout }
}
