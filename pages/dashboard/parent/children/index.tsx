import { GridColumns } from '@mui/x-data-grid'
import { DataGridViewer, InferNodeType } from '../../../../components/common/DataGridViewer'
import { SearchBar } from '../../../../components/common/SearchBar'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { ChildrenQuery, TeamRole, useChildrenQuery } from '../../../../types/graphql'

const columns: GridColumns<InferNodeType<ChildrenQuery['children']>> = [
  {
    width: 250,
    field: 'name',
    headerName: 'Name',
  },
  {
    width: 300,
    field: 'email',
    headerName: 'E-mail',
  },
  {
    width: 200,
    field: 'relation',
    sortable: false,
    headerName: 'Relation',
    valueGetter(params) {
      return params.row.childRole?.relation
    },
  },
  {
    width: 250,
    field: 'team',
    headerName: 'Team',
    valueGetter(params) {
      const roles = params.row.roles.filter((e) => e.role === 'ATHLETE') as TeamRole[]
      return roles.map((e) => e.team.name)
    },
    valueFormatter(params) {
      return params.value.join(', ')
    },
  },
]

function Children() {
  const query = useChildrenQuery()

  return (
    <DataGridViewer
      title="Children"
      query={query}
      columns={columns}
      data={query.data?.children}
      actions={<SearchBar onSearch={(search) => query.refetch({ search })} />}
    />
  )
}

export default withDashboardLayout(Children, {
  title: 'Children',
})
