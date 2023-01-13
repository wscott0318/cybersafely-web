import { createContext, useContext } from 'react'
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
  const { user } = useContext(AuthContext)

  if (!user) {
    throw new Error('User was not found')
  }

  return { user }
}
