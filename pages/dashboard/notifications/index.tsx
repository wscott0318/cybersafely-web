import { EmptyFileAnimation } from '../../../components/common/EmptyFileAnimation'
import { withDashboardLayout } from '../../../components/dashboard/Layout'

function Notifications() {
  return <EmptyFileAnimation />
}

export default withDashboardLayout(Notifications, {
  maxWidth: 'md',
  title: 'Notifications',
})
