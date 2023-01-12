import React from 'react'
import { useProfileQuery } from '../../types/graphql'
import { AuthContextProvider } from '../../utils/context/auth'

type DashboardLayoutProps = {
  children: JSX.Element | JSX.Element[]
  title?: string
}

export function DashboardLayout(props: DashboardLayoutProps) {
  const { data, error, refetch } = useProfileQuery()

  if (error) {
    return <p>{error.message}</p>
  }

  if (!data) {
    return <p>Loading...</p>
  }

  return (
    <AuthContextProvider user={data.profile} refetch={refetch}>
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
