import AccountIcon from '@mui/icons-material/AccountCircleOutlined'
import CloseIcon from '@mui/icons-material/CloseOutlined'
import GroupIcon from '@mui/icons-material/GroupOutlined'
import HomeIcon from '@mui/icons-material/HomeOutlined'
import LogoutIcon from '@mui/icons-material/LogoutOutlined'
import MenuIcon from '@mui/icons-material/MenuOutlined'
import PersonIcon from '@mui/icons-material/PersonOutlined'
import {
  Alert,
  AppBar,
  Avatar,
  Box,
  CircularProgress,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Snackbar,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import Head from 'next/head'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { Config } from '../../helpers/config'
import { useLogoUrl, useMobile, useSessionStorage } from '../../helpers/hooks'
import { AnyUserRole, ParentRole, TeamRole, useProfileQuery } from '../../types/graphql'
import { useAlert } from '../../utils/context/alert'
import { AuthContextProvider, useTeam, useUser } from '../../utils/context/auth'
import { DropDownButton } from '../common/DropDownButton'
import { NextLink as NextLinkLegacy } from '../common/NextLink'
import { SidebarLink } from './SidebarLink'

function HeaderAccount() {
  const team = useTeam()
  const { user, logout } = useUser()
  const { pushAlert } = useAlert()

  const [hideConfirm, setHideConfirm] = useSessionStorage('hideConfirmAlert')

  return (
    <>
      <Snackbar
        sx={{ maxWidth: 350 }}
        open={!user.emailConfirmed && hideConfirm !== 'true'}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="warning" sx={{ width: '100%' }} onClose={() => setHideConfirm('true')}>
          Please confirm your e-mail address at <b>{user.email}</b>.
        </Alert>
      </Snackbar>
      <DropDownButton
        size="large"
        variant="text"
        color="inherit"
        title={user.name}
        startIcon={<Avatar sx={{ width: 24, height: 24 }} />}
      >
        {team && <MenuItem disabled>Team</MenuItem>}
        {team && (
          <NextLinkLegacy href="/dashboard/team">
            <MenuItem>
              <ListItemIcon>
                <GroupIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>{team.team.name}</ListItemText>
            </MenuItem>
          </NextLinkLegacy>
        )}
        <MenuItem disabled>Profile</MenuItem>
        <NextLinkLegacy href="/dashboard/profile">
          <MenuItem>
            <ListItemIcon>
              <AccountIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{user.name}</ListItemText>
          </MenuItem>
        </NextLinkLegacy>
        <MenuItem
          sx={(theme) => ({
            color: theme.palette.error.main,
          })}
          onClick={() => {
            pushAlert({
              type: 'confirm',
              title: 'Logout',
              message: 'Are you sure you want to logout?',
              confirm: () => {
                logout()
              },
            })
          }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </DropDownButton>
    </>
  )
}

function Footer() {
  return (
    <Box mt={8} textAlign="center">
      <Divider />
      <Typography variant="body2" my={2} color="text.disabled">
        &copy; 2022 - {new Date().getFullYear()} {Config.appName}
      </Typography>
    </Box>
  )
}

export type DashboardLayoutProps = {
  children: JSX.Element | JSX.Element[]
  title: string
  sidebar: React.ReactNode
  search?: React.ReactNode
}

export function DashboardLayout(props: DashboardLayoutProps) {
  const router = useRouter()
  const logoUrl = useLogoUrl()
  const { isMobile } = useMobile()

  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (isMobile) {
      setOpen(false)
    }
  }, [isMobile])

  const type = useMemo(() => {
    if (isMobile) return 'temporary'
    return 'persistent'
  }, [isMobile])

  const { data, error } = useProfileQuery({
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first',
    initialFetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (error) {
      router.push('/auth/login')
    }
  }, [error, router])

  if (!data) {
    return (
      <Stack alignItems="center" justifyContent="center" minHeight="100vh">
        <CircularProgress />
        <Typography variant="body2">Loading User</Typography>
      </Stack>
    )
  }

  return (
    <AuthContextProvider user={data.profile}>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <AppBar
          color="transparent"
          sx={(theme) => ({
            width: 'unset',
            zIndex: theme.zIndex.drawer - 1,
            left: open && !isMobile ? 280 : 0,
          })}
        >
          <Toolbar disableGutters sx={{ px: 2 }}>
            <IconButton color="inherit" sx={{ mr: 1 }} onClick={() => setOpen((open) => !open)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap flexGrow={1}>
              {props.title}
            </Typography>
            <HeaderAccount />
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Stack direction="row" spacing={0} flexGrow={1}>
          <Drawer open={open} onClose={() => setOpen(false)} variant={type} PaperProps={{ sx: { border: 'none' } }}>
            <Stack
              width={280}
              spacing={0}
              flexGrow={1}
              overflow="auto"
              borderRight={1}
              position="relative"
              borderColor="divider"
              flexDirection="column"
              bgcolor="background.paper"
            >
              {isMobile && (
                <IconButton
                  onClick={() => setOpen(false)}
                  sx={(theme) => ({
                    position: 'absolute',
                    top: theme.spacing(1),
                    right: theme.spacing(1),
                  })}
                >
                  <CloseIcon />
                </IconButton>
              )}
              <Box p={2}>
                <NextLink href="/">
                  <NextImage alt="Logo" width={108} height={50} src={logoUrl} />
                </NextLink>
              </Box>
              {props.sidebar}
            </Stack>
          </Drawer>
          {open && !isMobile && <Box width={280} flexShrink={0} />}
          <Container maxWidth="xl" sx={{ py: 2 }}>
            {props.children}
            <Footer />
          </Container>
        </Stack>
      </Box>
    </AuthContextProvider>
  )
}

function Sidebar() {
  const { user } = useUser()

  const staff = user.roles.find((e) => e.role === 'STAFF' && e.status === 'ACCEPTED') as AnyUserRole | undefined
  const coach = user.roles.find((e) => e.role === 'COACH' && e.status === 'ACCEPTED') as TeamRole | undefined
  const athlete = user.roles.find((e) => e.role === 'ATHLETE' && e.status === 'ACCEPTED') as TeamRole | undefined
  const parent = user.roles.find((e) => e.role === 'PARENT' && e.status === 'ACCEPTED') as ParentRole | undefined

  if (staff) {
    return (
      <List>
        <SidebarLink href="/dashboard/staff/home" icon={<HomeIcon />} title="Home" />
        <SidebarLink href="/dashboard/staff/users" icon={<PersonIcon />} title="Users" />
        <SidebarLink href="/dashboard/staff/teams" icon={<GroupIcon />} title="Teams" />
      </List>
    )
  }

  if (coach) {
    return (
      <List>
        <SidebarLink href="/dashboard/coach/home" icon={<HomeIcon />} title="Home" />
        <SidebarLink href="/dashboard/coach/members" icon={<PersonIcon />} title="Members" />
      </List>
    )
  }

  if (athlete) {
    return (
      <List>
        <SidebarLink href="/dashboard/athlete/home" icon={<HomeIcon />} title="Home" />
        <SidebarLink href="/dashboard/athlete/members" icon={<PersonIcon />} title="Members" />
      </List>
    )
  }

  if (parent) {
    return (
      <List>
        <SidebarLink href="/dashboard/parent/home" icon={<HomeIcon />} title="Home" />
        <SidebarLink href="/dashboard/parent/children" icon={<GroupIcon />} title="Children" />
      </List>
    )
  }

  return null
}

export function withDashboardLayout(
  Component: React.ComponentType<any>,
  layoutProps: Omit<DashboardLayoutProps, 'children' | 'sidebar'>
) {
  return function Wrapper(props: any) {
    return (
      <DashboardLayout {...layoutProps} sidebar={<Sidebar />} title={[layoutProps.title, Config.appName].join(' | ')}>
        <Component {...props} />
      </DashboardLayout>
    )
  }
}
