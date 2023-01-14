import GroupsIcon from '@mui/icons-material/GroupsOutlined'
import HomeIcon from '@mui/icons-material/HomeOutlined'
import PersonIcon from '@mui/icons-material/PersonOutlined'
import { List, ListSubheader } from '@mui/material'
import { DashboardLayout, DashboardLayoutProps } from './Layout'
import { SidebarLink } from './SidebarLink'

function StaffSidebar() {
  return (
    <>
      <List>
        <SidebarLink href="/dashboard/staff/home" icon={<HomeIcon />} title="Home" />
      </List>
      <List subheader={<ListSubheader>Management</ListSubheader>}>
        <SidebarLink href="/dashboard/staff/users" icon={<PersonIcon />} title="Users" />
        <SidebarLink href="/dashboard/staff/teams" icon={<GroupsIcon />} title="Teams" />
      </List>
    </>
  )
}

export function withStaffDashboardLayout(
  Component: React.ComponentType<any>,
  layoutProps: Omit<DashboardLayoutProps, 'children' | 'sidebar'>
) {
  return function Wrapper(props: any) {
    return (
      <DashboardLayout
        {...layoutProps}
        sidebar={<StaffSidebar />}
        title={[layoutProps.title, 'Staff Dashboard'].join(' | ')}
      >
        <Component {...props} />
      </DashboardLayout>
    )
  }
}
