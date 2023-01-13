import AccountIcon from '@mui/icons-material/AccountCircleOutlined'
import ArrowIcon from '@mui/icons-material/ArrowForwardOutlined'
import CloseIcon from '@mui/icons-material/CloseOutlined'
import GroupsIcon from '@mui/icons-material/GroupsOutlined'
import HomeIcon from '@mui/icons-material/HomeOutlined'
import LogoutIcon from '@mui/icons-material/LogoutOutlined'
import PeopleIcon from '@mui/icons-material/PeopleOutlined'
import SearchIcon from '@mui/icons-material/SearchOutlined'
import {
  Alert,
  AppBar,
  Box,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  outlinedInputClasses,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useMemo, useState } from 'react'
import { Config } from '../../helpers/config'
import { useProfileQuery } from '../../types/graphql'
import { AuthContextProvider } from '../../utils/context/auth'
import { NextLink } from '../common/NextLink'

type SidebarLinkProps = {
  href: string
  icon: React.ReactNode
  title: string
  color?: string
}

function SidebarLink(props: SidebarLinkProps) {
  const router = useRouter()
  const isSelected = router.pathname.startsWith(props.href)

  return (
    <NextLink href={props.href}>
      <ListItemButton component="a" selected={isSelected} sx={{ color: props.color }}>
        <ListItemIcon sx={{ color: 'inherit' }}>{props.icon}</ListItemIcon>
        <ListItemText primary={props.title} />
      </ListItemButton>
    </NextLink>
  )
}

type HeaderSearchProps = {
  initialSearch?: string
  onSearch(search: string): void
}

function HeaderSearch(props: HeaderSearchProps) {
  const [search, setSearch] = useState(props.initialSearch)

  const endAdornment = useMemo(() => {
    if (!search) {
      return <SearchIcon fontSize="small" color="disabled" />
    } else if (search === props.initialSearch) {
      return (
        <IconButton edge="end" size="small" onClick={() => props.onSearch('')}>
          <CloseIcon fontSize="small" color="disabled" />
        </IconButton>
      )
    }

    return (
      <IconButton edge="end" size="small" color="primary" onClick={() => props.onSearch(search)}>
        <ArrowIcon fontSize="small" />
      </IconButton>
    )
  }, [search, props.initialSearch])

  return (
    <TextField
      value={search}
      placeholder="Search..."
      onChange={(e) => setSearch(e.target.value)}
      InputProps={{
        endAdornment: <InputAdornment position="end">{endAdornment}</InputAdornment>,
      }}
      sx={(e) => ({
        maxWidth: 280,
        width: '100%',
        ['.' + outlinedInputClasses.root]: {
          background: e.palette.background.paper,
        },
        ['.' + outlinedInputClasses.notchedOutline]: {
          border: 'none',
        },
      })}
    />
  )
}

type DashboardLayoutProps = {
  children: JSX.Element | JSX.Element[]
  title?: string
}

export function DashboardLayout(props: DashboardLayoutProps) {
  const { data, error, refetch } = useProfileQuery()

  if (error) {
    return <Alert severity="error">{error.message}</Alert>
  }

  if (!data) {
    return <CircularProgress />
  }

  return (
    <AuthContextProvider user={data.profile} refetch={refetch}>
      <Head>{!!props.title && <title>{props.title}</title>}</Head>
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <AppBar>
          <Toolbar>
            <Typography variant="h6" noWrap flexGrow={1}>
              {Config.appName}
            </Typography>
            {/* <HeaderSearch onSearch={() => {}} /> */}
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
              <List subheader={<ListSubheader>Staff</ListSubheader>}>
                <SidebarLink href="/dashboard/staff/home" icon={<HomeIcon />} title="Home" />
                <SidebarLink href="/dashboard/staff/users" icon={<PeopleIcon />} title="Users" />
                <SidebarLink href="/dashboard/staff/organizations" icon={<GroupsIcon />} title="Organizations" />
              </List>
              <List subheader={<ListSubheader>Coach</ListSubheader>}>
                <SidebarLink href="/dashboard/coach/home" icon={<HomeIcon />} title="Home" />
                <SidebarLink href="/dashboard/coach/members" icon={<PeopleIcon />} title="Members" />
              </List>
              <List subheader={<ListSubheader>Athlete</ListSubheader>}>
                <SidebarLink href="/dashboard/athlete/home" icon={<HomeIcon />} title="Home" />
                <SidebarLink href="/dashboard/athlete/members" icon={<PeopleIcon />} title="Members" />
              </List>
              <List subheader={<ListSubheader>Parent</ListSubheader>}>
                <SidebarLink href="/dashboard/parent/home" icon={<HomeIcon />} title="Home" />
                <SidebarLink href="/dashboard/parent/members" icon={<PeopleIcon />} title="Children" />
              </List>
              <Box flexGrow={1} />
              <Divider />
              <List>
                <SidebarLink href="/dashboard/profile" icon={<AccountIcon />} title={data.profile.name} />
                <SidebarLink href="/logout" icon={<LogoutIcon />} title="Logout" color="error.main" />
              </List>
            </Stack>
          </Stack>
          <Box width={280} />
          <Container maxWidth="xl" sx={{ py: 2 }}>
            {props.children}
          </Container>
        </Stack>
      </Box>
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
