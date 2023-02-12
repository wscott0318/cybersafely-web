import { EmptyFileAnimation } from '../../../../../components/common/EmptyFileAnimation'
import { withDashboardLayout } from '../../../../../components/dashboard/Layout'

function Child() {
  return <EmptyFileAnimation />
}

export default withDashboardLayout(Child, {
  title: 'Child',
})
