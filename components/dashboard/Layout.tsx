import AccountIcon from '@mui/icons-material/AccountCircleOutlined'
import CloseIcon from '@mui/icons-material/CloseOutlined'
import FeedIcon from '@mui/icons-material/FeedOutlined'
import HomeIcon from '@mui/icons-material/HomeOutlined'
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import ArrowUpIcon from '@mui/icons-material/KeyboardArrowUpOutlined'
import LogoutIcon from '@mui/icons-material/LogoutOutlined'
import MenuIcon from '@mui/icons-material/MenuOutlined'
import NotificationIcon from '@mui/icons-material/NotificationsOutlined'
import PersonIcon from '@mui/icons-material/PeopleOutlined'
import SchoolIcon from '@mui/icons-material/SchoolOutlined'
import SettingsIcon from '@mui/icons-material/SettingsOutlined'
import {
  Alert,
  AppBar,
  Avatar,
  Badge,
  Box,
  Breakpoint,
  Collapse,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  listClasses,
  ListItemIcon,
  ListItemText,
  ListSubheader,
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
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Config } from '../../helpers/config'
import { useLogoUrl, useMobile, useSessionStorage } from '../../helpers/hooks'
import { useNotificationsCountQuery, useProfileQuery } from '../../types/graphql'
import { useAlert } from '../../utils/context/alert'
import { AuthContextProvider, useSchoolRole, useUser } from '../../utils/context/auth'
import { DropDownButton } from '../common/DropDownButton'
import { NextLink as NextLinkLegacy } from '../common/NextLink'
import { LoadingLogo } from '../common/NProgress'
import { SidebarLink } from './SidebarLink'

function HeaderAccount() {
  const schoolRole = useSchoolRole()
  const { user, logout } = useUser()
  const { pushAlert } = useAlert()

  const [hideConfirm, setHideConfirm] = useSessionStorage('hideConfirmAlert')

  const { data } = useNotificationsCountQuery({
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first',
    initialFetchPolicy: 'network-only',
  })

  return (
    <>
      <Snackbar
        sx={{ maxWidth: 350 }}
        open={!user.emailConfirmed && hideConfirm !== 'true'}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        TransitionProps={{
          mountOnEnter: true,
          unmountOnExit: true,
        }}
      >
        <Alert severity="warning" sx={{ width: '100%' }} onClose={() => setHideConfirm('true')}>
          Please confirm your e-mail address at <b>{user.email}</b>.
        </Alert>
      </Snackbar>
      <NextLink href="/dashboard/notifications">
        <IconButton sx={{ mr: 1 }}>
          <Badge color="primary" badgeContent={data?.notificationsCount}>
            <NotificationIcon />
          </Badge>
        </IconButton>
      </NextLink>
      <DropDownButton
        size="large"
        variant="text"
        color="inherit"
        title={user.name}
        uppercase={false}
        startIcon={<Avatar sx={{ width: 28, height: 28 }} src={user.avatar?.url} />}
      >
        {schoolRole && (
          <MenuItem disabled sx={{ fontSize: '0.85rem', textTransform: 'uppercase' }}>
            School
          </MenuItem>
        )}
        {schoolRole && (
          <NextLinkLegacy href="/dashboard/school">
            <MenuItem>
              <ListItemIcon>
                <SchoolIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Manage</ListItemText>
            </MenuItem>
          </NextLinkLegacy>
        )}
        <MenuItem disabled sx={{ fontSize: '0.85rem', textTransform: 'uppercase' }}>
          Account
        </MenuItem>
        <NextLinkLegacy href="/dashboard/profile">
          <MenuItem>
            <ListItemIcon>
              <AccountIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
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
        &copy; 2022 - {new Date().getFullYear()} {Config.app.name}
      </Typography>
    </Box>
  )
}

function SidebarAccount() {
  const { user } = useUser()
  const schoolRole = useSchoolRole()

  return (
    <List>
      {schoolRole && (
        <SidebarLink
          href="/dashboard/school"
          title={schoolRole.school.name}
          icon={
            <Avatar sx={{ width: 28, height: 28 }} src={schoolRole.school.logo?.url}>
              <SchoolIcon fontSize="inherit" />
            </Avatar>
          }
        />
      )}
      <SidebarLink
        title={user.name}
        href="/dashboard/profile"
        icon={<Avatar sx={{ width: 28, height: 28 }} src={user.avatar?.url} />}
      />
    </List>
  )
}

export type DashboardLayoutProps = {
  children: JSX.Element | JSX.Element[]
  title: string
  sidebar: React.ReactNode
  search?: React.ReactNode
  maxWidth?: Breakpoint
}

export function DashboardLayout(props: DashboardLayoutProps) {
  const router = useRouter()
  const logoUrl = useLogoUrl()
  const { isMobile, isTablet } = useMobile()

  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (isTablet) {
      setOpen(false)
    }
  }, [isTablet])

  const type = useMemo(() => {
    if (isTablet) return 'temporary'
    return 'persistent'
  }, [isTablet])

  const width = useMemo(() => {
    if (isMobile) return '100vw'
    return '280px'
  }, [isMobile])

  const { data, error, refetch } = useProfileQuery({
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first',
    initialFetchPolicy: 'network-only',
  })

  const userRole = useMemo(() => {
    if (!data) return

    const staff = data.profile.roles.find((e) => e.role === 'STAFF' && e.status === 'ACCEPTED')
    const admin = data.profile.roles.find((e) => e.role === 'ADMIN' && e.status === 'ACCEPTED')
    const coach = data.profile.roles.find((e) => e.role === 'COACH' && e.status === 'ACCEPTED')
    const athlete = data.profile.roles.find((e) => e.role === 'ATHLETE' && e.status === 'ACCEPTED')
    const parent = data.profile.roles.find((e) => e.role === 'PARENT' && e.status === 'ACCEPTED')

    return staff ?? admin ?? coach ?? athlete ?? parent
  }, [data])

  const refetchUser = useCallback(async () => {
    await refetch()
  }, [refetch])

  useEffect(() => {
    if (error) {
      router.push('/auth/login')
    }
  }, [error, router])

  if (!data) {
    return (
      <Stack alignItems="center" justifyContent="center" minHeight="100vh">
        <LoadingLogo />
      </Stack>
    )
  }

  return (
    <AuthContextProvider user={data.profile} role={userRole!.role} refetchUser={refetchUser}>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <AppBar
          color="transparent"
          sx={(theme) => ({
            width: 'unset',
            zIndex: theme.zIndex.drawer - 1,
            left: open && !isTablet ? width : 0,
            background: theme.palette.background.paper,
          })}
        >
          <Toolbar disableGutters sx={{ px: 2 }}>
            <IconButton sx={{ mr: 1 }} onClick={() => setOpen((open) => !open)}>
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
          <Drawer open={open} variant={type} onClose={() => setOpen(false)} PaperProps={{ sx: { border: 'none' } }}>
            <Stack
              spacing={0}
              flexGrow={1}
              width={width}
              overflow="auto"
              borderRight={1}
              position="relative"
              borderColor="divider"
              flexDirection="column"
              bgcolor="background.paper"
              sx={{
                ['.' + listClasses.root]: {
                  my: 0.5,
                },
              }}
            >
              {isTablet && (
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
              <Box p={3}>
                <NextLink href="/">
                  <NextImage alt="Logo" width={162} height={75} src={logoUrl} />
                </NextLink>
              </Box>
              {props.sidebar}
              <Box flexGrow={1} />
              <Divider sx={{ mx: 2 }} />
              <SidebarAccount />
            </Stack>
          </Drawer>
          {open && !isTablet && <Box width={width} flexShrink={0} />}
          <Container maxWidth={props.maxWidth ?? 'xl'} sx={{ py: 2 }}>
            {props.children}
            <Footer />
          </Container>
        </Stack>
      </Box>
    </AuthContextProvider>
  )
}

function CollapsableList(props: { title?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)

  return (
    <List
      subheader={
        !!props.title && (
          <ListSubheader>
            <Stack direction="row" alignItems="center">
              <Typography variant="inherit" flexGrow={1}>
                {props.title}
              </Typography>
              <IconButton size="small" onClick={() => setOpen((open) => !open)}>
                {open ? (
                  <ArrowUpIcon fontSize="small" color="disabled" />
                ) : (
                  <ArrowDownIcon fontSize="small" color="disabled" />
                )}
              </IconButton>
            </Stack>
          </ListSubheader>
        )
      }
    >
      <Collapse in={open}>{props.children}</Collapse>
    </List>
  )
}

function Sidebar() {
  const { role } = useUser()

  switch (role) {
    case 'STAFF':
      return (
        <>
          <CollapsableList title="Dashboard">
            <SidebarLink href="/dashboard/staff/home" icon={<HomeIcon />} title="Home" />
          </CollapsableList>
          <CollapsableList title="Management">
            <SidebarLink href="/dashboard/staff/users" icon={<PersonIcon />} title="Users" />
            <SidebarLink href="/dashboard/staff/schools" icon={<SchoolIcon />} title="Schools" />
          </CollapsableList>
          <CollapsableList title="Settings">
            <SidebarLink href="/dashboard/staff/settings" icon={<SettingsIcon />} title="Settings" />
          </CollapsableList>
        </>
      )

    case 'ADMIN':
      return (
        <CollapsableList>
          <SidebarLink href="/dashboard/admin/home" icon={<HomeIcon />} title="Home" />
          <SidebarLink href="/dashboard/admin/members" icon={<PersonIcon />} title="Members" />
          <SidebarLink href="/dashboard/admin/posts" icon={<FeedIcon />} title="Posts" />
        </CollapsableList>
      )

    case 'COACH':
      return (
        <CollapsableList>
          <SidebarLink href="/dashboard/coach/home" icon={<HomeIcon />} title="Home" />
          <SidebarLink href="/dashboard/coach/members" icon={<PersonIcon />} title="Members" />
          <SidebarLink href="/dashboard/coach/posts" icon={<FeedIcon />} title="Posts" />
        </CollapsableList>
      )

    case 'ATHLETE':
      return (
        <CollapsableList>
          <SidebarLink href="/dashboard/athlete/home" icon={<HomeIcon />} title="Home" />
          <SidebarLink href="/dashboard/athlete/members" icon={<PersonIcon />} title="Members" />
        </CollapsableList>
      )

    case 'PARENT':
      return (
        <CollapsableList>
          <SidebarLink href="/dashboard/parent/home" icon={<HomeIcon />} title="Home" />
        </CollapsableList>
      )
  }
}

export function withDashboardLayout(
  Component: React.ComponentType<any>,
  layoutProps: Omit<DashboardLayoutProps, 'children' | 'sidebar'>
) {
  return function Wrapper(props: any) {
    return (
      <DashboardLayout
        {...layoutProps}
        sidebar={<Sidebar />}
        title={[layoutProps.title, Config.app.shortName].join(' | ')}
      >
        <Component {...props} />
      </DashboardLayout>
    )
  }
}
