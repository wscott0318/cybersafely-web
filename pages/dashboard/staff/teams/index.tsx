import { GridColumns } from '@mui/x-data-grid'
import { DataGridViewer, InferNodeType } from '../../../../components/common/DataGridViewer'
import { SearchBar } from '../../../../components/common/SearchBar'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
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
      actions={<SearchBar onSearch={(search) => query.refetch({ search })} />}
    />
  )
}

export default withDashboardLayout(Teams, {
  title: 'Teams',
})
