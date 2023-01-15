import { GridColumns } from '@mui/x-data-grid'
import { DataGridViewer, InferNodeType } from '../../../../components/common/DataGridViewer'
import { SearchBar } from '../../../../components/common/SearchBar'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { ChildrenQuery, useChildrenQuery } from '../../../../types/graphql'

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
]

function Home() {
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

export default withDashboardLayout(Home, {
  title: 'Home',
})
