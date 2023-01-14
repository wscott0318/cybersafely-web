import HomeIcon from '@mui/icons-material/HomeOutlined'
import { List } from '@mui/material'
import { DashboardLayout, DashboardLayoutProps } from './Layout'
import { SidebarLink } from './SidebarLink'

function CoachSidebar() {
  return (
    <>
      <List>
        <SidebarLink href="/dashboard/coach/home" icon={<HomeIcon />} title="Home" />
      </List>
    </>
  )
}

export function withCoachDashboardLayout(
  Component: React.ComponentType<any>,
  layoutProps: Omit<DashboardLayoutProps, 'children' | 'sidebar'>
) {
  return function Wrapper(props: any) {
    return (
      <DashboardLayout
        {...layoutProps}
        sidebar={<CoachSidebar />}
        title={[layoutProps.title, 'Coach Dashboard'].join(' | ')}
      >
        <Component {...props} />
      </DashboardLayout>
    )
  }
}
