import AccountIcon from '@mui/icons-material/AccountCircleOutlined'
import LogoutIcon from '@mui/icons-material/LogoutOutlined'
import {
  Alert,
  AppBar,
  Box,
  CircularProgress,
  Container,
  Divider,
  List,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import Head from 'next/head'
import React from 'react'
import { Config } from '../../helpers/config'
import { useProfileQuery } from '../../types/graphql'
import { AuthContextProvider } from '../../utils/context/auth'
import { SidebarLink } from './SidebarLink'

export type DashboardLayoutProps = {
  children: JSX.Element | JSX.Element[]
  title: string
  sidebar: React.ReactNode
  search?: React.ReactNode
}

export function DashboardLayout(props: DashboardLayoutProps) {
  const { data, error } = useProfileQuery()

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
