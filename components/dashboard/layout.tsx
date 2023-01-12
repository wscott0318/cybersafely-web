import React from 'react'
import { MeQuery, useMeQuery } from '../../types/graphql'
import { AuthContextProvider } from '../../utils/context/auth'

const Level = {
  any: () => true,
  admin: (data: MeQuery) => data.me.membership?.isAdmin,
  staff: (data: MeQuery) => data.me.isStaff,
} as const

type Level = keyof typeof Level

type DashboardLayoutProps = {
  children: JSX.Element | JSX.Element[]
  title?: string
  level?: Level
}

export function DashboardLayout(props: DashboardLayoutProps) {
  const { data, error, refetch } = useMeQuery()

  if (error) {
    return <p>{error.message}</p>
  }

  if (!data) {
    return <p>Loading...</p>
  }

  if (props.level && !Level[props.level](data)) {
    return <p>You are not authorized to view this page</p>
  }

  return (
    <AuthContextProvider user={data.me} refetch={refetch}>
      {props.children}
    </AuthContextProvider>
  )
}

export function withDashboardLayout<P extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<P>,
  layoutProps: Omit<DashboardLayoutProps, 'children'>
) {
  return function Wrapper(props: P) {
    return (
      <DashboardLayout {...layoutProps}>
        <Component {...props} />
      </DashboardLayout>
    )
  }
}
