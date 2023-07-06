import { useApolloClient } from '@apollo/client'
import AccountIcon from '@mui/icons-material/AccountCircleOutlined'
import CloseIcon from '@mui/icons-material/CloseOutlined'
import FeedIcon from '@mui/icons-material/FeedOutlined'
import HomeIcon from '@mui/icons-material/HomeOutlined'
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import ArrowUpIcon from '@mui/icons-material/KeyboardArrowUpOutlined'
import LinkIcon from '@mui/icons-material/LinkOutlined'
import LogoutIcon from '@mui/icons-material/LogoutOutlined'
import MenuIcon from '@mui/icons-material/MenuOutlined'
import NotificationIcon from '@mui/icons-material/NotificationsOutlined'
import PersonIcon from '@mui/icons-material/PeopleOutlined'
import SchoolIcon from '@mui/icons-material/SchoolOutlined'
import SettingsIcon from '@mui/icons-material/SettingsOutlined'
import SwitchIcon from '@mui/icons-material/SyncOutlined'
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Breakpoint,
  Button,
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
import { useLogoUrl, useMobile } from '../../helpers/hooks'
import { MyUserDocument, MyUserQuery, MyUserQueryVariables } from '../../schema'
import { useAlert } from '../../utils/context/alert'
import { AuthContextProvider, useSchoolRole, useUser } from '../../utils/context/auth'
import { IntercomProvider } from '../../utils/intercom'
import { StorageManager } from '../../utils/storage'
import { DropDownButton } from '../common/DropDownButton'
import { NextLink as NextLinkLegacy } from '../common/NextLink'
import { LoadingLogo } from '../common/NProgress'
import { SidebarLink } from './SidebarLink'

function HeaderAccount() {
  const schoolRole = useSchoolRole()
  const { user, logout } = useUser()
  const { pushAlert } = useAlert()

  return (
    <>
      <NextLink href="/dashboard/notifications">
        <IconButton sx={{ mr: 1 }}>
          <Badge color="primary" badgeContent={user.notificationCount ?? 0}>
            <NotificationIcon />
          </Badge>
        </IconButton>
      </NextLink>
      <DropDownButton
        size="large"
        variant="text"
        color="inherit"
        uppercase={false}
        startIcon={<Avatar sx={{ width: 36, height: 36 }} src={user.avatar?.url} />}
        title={
          <Typography variant="inherit" textAlign="left">
            {user.name}
            {schoolRole && (
              <>
                <br />
                <Typography variant="body2" color="text.disabled" mt={-0.5}>
                  {schoolRole.school.name}
                </Typography>
              </>
            )}
          </Typography>
        }
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
                <Avatar sx={{ width: 24, height: 24 }} src={schoolRole.school.logo?.url} />
              </ListItemIcon>
              <ListItemText>{schoolRole.school.name}</ListItemText>
            </MenuItem>
          </NextLinkLegacy>
        )}
        <MenuItem disabled sx={{ fontSize: '0.85rem', textTransform: 'uppercase' }}>
          Account
        </MenuItem>
        {user.roles.length > 1 && (
          <NextLinkLegacy href="/dashboard">
            <MenuItem>
              <ListItemIcon>
                <SwitchIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Switch Account</ListItemText>
            </MenuItem>
          </NextLinkLegacy>
        )}
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

export type DashboardLayoutProps = {
  children: JSX.Element | JSX.Element[]
  title: string
  sidebar: React.ReactNode
  search?: React.ReactNode
  maxWidth?: Breakpoint
}

function WelcomeModal({ onSubmit }: { onSubmit: () => void }) {
  const logoUrl = useLogoUrl()

  return (
    <Stack>
      <Box>
        <NextImage alt="Logo" width={162} height={75} src={logoUrl} />
        <Typography variant="h6" mt={2}>
          Welcome to the CyberSafely.ai Beta Testing Program
        </Typography>
        <Typography mt={1}>
          We are happy to have you join us on refining CyberSafely.ai - please use the chat button in the bottom right
          to connect with us on any questions and we will get back to you promptly.
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={2}>
          CyberSafely.ai Team
        </Typography>
      </Box>
      <Button onClick={onSubmit}>Understood</Button>
    </Stack>
  )
}

export function DashboardLayout(props: DashboardLayoutProps) {
  const router = useRouter()
  const client = useApolloClient()
  const logoUrl = useLogoUrl()
  const { isMobile, isTablet } = useMobile()
  const { pushAlert } = useAlert()

  const [user, setUser] = useState<MyUserQuery['user']>()
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

  const refetchUser = useCallback(async () => {
    try {
      const id = StorageManager.get('userId')

      if (typeof id === 'string') {
        const { data } = await client.query<MyUserQuery, MyUserQueryVariables>({
          variables: { id },
          query: MyUserDocument,
        })
        setUser(data.user)
      } else {
        throw new Error('No user')
      }
    } catch (error) {
      console.error(error)
      router.replace('/auth/login')
    }
  }, [client, router])

  useEffect(() => {
    refetchUser()
  }, [])

  const userRole = useMemo(() => {
    const roleId = StorageManager.get('roleId')
    return user?.roles.find((e) => e.id === roleId)
  }, [user])

  useEffect(() => {
    if (userRole && userRole.type !== 'STAFF' && !localStorage.getItem('hide_welcome')) {
      pushAlert({
        title: '',
        type: 'custom',
        content: WelcomeModal,
        result: () => {
          localStorage.setItem('hide_welcome', 'true')
        },
      })
    }
  }, [userRole?.type])

  if (!user) {
    return (
      <Stack alignItems="center" justifyContent="center" minHeight="100vh">
        <LoadingLogo />
      </Stack>
    )
  }

  return (
    <AuthContextProvider user={user} role={userRole?.type} refetchUser={refetchUser}>
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
            </Stack>
          </Drawer>
          {open && !isTablet && <Box width={width} flexShrink={0} />}
          <Container maxWidth={props.maxWidth ?? 'xl'} sx={{ py: 2 }}>
            <IntercomProvider>{props.children}</IntercomProvider>
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
          <CollapsableList>
            <SidebarLink href="/dashboard/staff/home" icon={<HomeIcon />} title="Home" />
            <SidebarLink href="/dashboard/staff/staff" icon={<PersonIcon />} title="Staff" />
            <SidebarLink href="/dashboard/staff/users" icon={<PersonIcon />} title="Users" />
            <SidebarLink href="/dashboard/staff/schools" icon={<SchoolIcon />} title="Schools" />
            <SidebarLink href="/dashboard/staff/posts" icon={<FeedIcon />} title="Posts" />
            <SidebarLink href="/dashboard/staff/settings" icon={<SettingsIcon />} title="Settings" />
          </CollapsableList>
        </>
      )

    case 'ADMIN':
      return (
        <CollapsableList>
          <SidebarLink href="/dashboard/admin/home" icon={<HomeIcon />} title="Home" />
          <SidebarLink href="/dashboard/admin/members" icon={<PersonIcon />} title="Members" />
          <SidebarLink href="/dashboard/admin/students" icon={<PersonIcon />} title="Students" />
          <SidebarLink href="/dashboard/admin/posts" icon={<FeedIcon />} title="Posts" />
        </CollapsableList>
      )

    case 'COACH':
      return (
        <CollapsableList>
          <SidebarLink href="/dashboard/coach/home" icon={<HomeIcon />} title="Home" />
          <SidebarLink href="/dashboard/coach/members" icon={<PersonIcon />} title="Members" />
          <SidebarLink href="/dashboard/coach/students" icon={<PersonIcon />} title="Students" />
          <SidebarLink href="/dashboard/coach/posts" icon={<FeedIcon />} title="Posts" />
        </CollapsableList>
      )

    case 'STUDENT':
      return (
        <CollapsableList>
          <SidebarLink href="/dashboard/student/home" icon={<HomeIcon />} title="Home" />
          <SidebarLink href="/dashboard/student/social" icon={<LinkIcon />} title="Social" />
          <SidebarLink href="/dashboard/student/posts" icon={<FeedIcon />} title="Posts" />
        </CollapsableList>
      )

    case 'PARENT':
      return (
        <CollapsableList>
          <SidebarLink href="/dashboard/parent/home" icon={<HomeIcon />} title="Home" />
          <SidebarLink href="/dashboard/parent/children" icon={<PersonIcon />} title="Children" />
          <SidebarLink href="/dashboard/parent/posts" icon={<FeedIcon />} title="Posts" />
        </CollapsableList>
      )

    default:
      return null
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
