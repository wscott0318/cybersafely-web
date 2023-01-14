import AccountIcon from '@mui/icons-material/AccountCircleOutlined'
import GroupsIcon from '@mui/icons-material/GroupsOutlined'
import HomeIcon from '@mui/icons-material/HomeOutlined'
import LogoutIcon from '@mui/icons-material/LogoutOutlined'
import PeopleIcon from '@mui/icons-material/PeopleOutlined'
import {
  Alert,
  AppBar,
  Box,
  CircularProgress,
  Container,
  Divider,
  List,
  ListSubheader,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import Head from 'next/head'
import React from 'react'
import { Config } from '../../helpers/config'
import { AnyUserRole, ParentRole, TeamRole, useProfileQuery } from '../../types/graphql'
import { AuthContextProvider, useUser } from '../../utils/context/auth'
import { SidebarLink } from './SidebarLink'

export type DashboardLayoutProps = {
  children: JSX.Element | JSX.Element[]
  title: string
  sidebar: React.ReactNode
  search?: React.ReactNode
}

export function DashboardLayout(props: DashboardLayoutProps) {
  const { data, error } = useProfileQuery({
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first',
    initialFetchPolicy: 'network-only',
  })

  if (error) {
    return <Alert severity="error">{error.message}</Alert>
  }

  if (!data) {
    return <CircularProgress />
  }

  return (
    <AuthContextProvider user={data.profile}>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <AppBar>
          <Toolbar disableGutters sx={{ px: 2 }}>
            <Typography variant="h6" noWrap flexGrow={1}>
              {Config.appName}
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Stack direction="row" spacing={0} flexGrow={1}>
          <Stack spacing={0} top={0} left={0} bottom={0} position="fixed">
            <Toolbar />
            <Stack
              width={280}
              spacing={0}
              flexGrow={1}
              overflow="auto"
              borderRight={1}
              borderColor="divider"
              flexDirection="column"
              bgcolor="background.paper"
            >
              {props.sidebar}
              <Box flexGrow={1} />
              <Divider />
              <List>
                <SidebarLink
                  icon={<AccountIcon />}
                  href="/dashboard/profile"
                  title={data.profile.name}
                  subtitle={data.profile.email}
                />
                <SidebarLink href="/auth/login" icon={<LogoutIcon />} title="Logout" color="error.main" />
              </List>
            </Stack>
          </Stack>
          <Box width={280} flexShrink={0} />
          <Container maxWidth="xl" sx={{ py: 2 }}>
            {props.children}
          </Container>
        </Stack>
      </Box>
    </AuthContextProvider>
  )
}

function Sidebar() {
  const { user } = useUser()

  const staff = user.roles.find((e) => e.role === 'STAFF') as AnyUserRole | undefined
  const coach = user.roles.find((e) => e.role === 'COACH') as TeamRole | undefined
  const athlete = user.roles.find((e) => e.role === 'ATHLETE') as TeamRole | undefined
  const parent = user.roles.find((e) => e.role === 'PARENT') as ParentRole | undefined

  if (staff) {
    return (
      <>
        <List>
          <SidebarLink href="/dashboard/staff/home" icon={<HomeIcon />} title="Home" />
        </List>
        <List subheader={<ListSubheader>Management</ListSubheader>}>
          <SidebarLink href="/dashboard/staff/users" icon={<PeopleIcon />} title="Users" />
          <SidebarLink href="/dashboard/staff/teams" icon={<GroupsIcon />} title="Teams" />
        </List>
      </>
    )
  } else if (coach) {
    return (
      <>
        <List>
          <SidebarLink href="/dashboard/coach/home" icon={<HomeIcon />} title="Home" />
        </List>
        <List subheader={<ListSubheader>Management</ListSubheader>}>
          <SidebarLink href="/dashboard/coach/members" icon={<PeopleIcon />} title="Members" />
        </List>
      </>
    )
  } else if (athlete) {
    return (
      <>
        <List>
          <SidebarLink href="/dashboard/athlete/home" icon={<HomeIcon />} title="Home" />
        </List>
      </>
    )
  } else if (parent) {
    // TODO:
  }

  return null
}

export function withDashboardLayout(
  Component: React.ComponentType<any>,
  layoutProps: Omit<DashboardLayoutProps, 'children' | 'sidebar'>
) {
  return function Wrapper(props: any) {
    return (
      <DashboardLayout {...layoutProps} sidebar={<Sidebar />} title={[layoutProps.title, 'Dashboard'].join(' | ')}>
        <Component {...props} />
      </DashboardLayout>
    )
  }
}
