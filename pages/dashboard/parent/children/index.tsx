import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { ParentChildrenTable } from '../../../../components/shared/ParentChildrenTable'

function Children() {
  return <ParentChildrenTable />
}

export default withDashboardLayout(Children, {
  title: 'Children',
})
