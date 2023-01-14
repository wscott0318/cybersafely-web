import { GridColumns } from '@mui/x-data-grid'
import { DataGridViewer, InferNodeType } from '../../../../components/common/DataGridViewer'
import { withStaffDashboardLayout } from '../../../../components/dashboard/StaffLayout'
import { TeamsQuery, useTeamsQuery } from '../../../../types/graphql'

const columns: GridColumns<InferNodeType<TeamsQuery['teams']>> = [
  {
    width: 250,
    field: 'name',
    headerName: 'Name',
  },
  {
    width: 150,
    field: 'memberCount',
    headerName: 'Members',
  },
  {
    width: 200,
    field: 'createdAt',
    headerName: 'Joined',
    valueFormatter(params) {
      return new Date(params.value).toLocaleString()
    },
  },
]

function Teams() {
  const query = useTeamsQuery()

  return (
    <DataGridViewer
      title="Teams"
      query={query}
      columns={columns}
      data={query.data?.teams}
      href={(e) => '/dashboard/staff/teams/' + e.id}
    />
  )
}

export default withStaffDashboardLayout(Teams, {
  title: 'Teams',
})
