import { CircularProgress, Stack, Typography } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { DataGridActions, DataGridViewer, InferNodeType } from '../../../../components/common/DataGridViewer'
import { SearchBar } from '../../../../components/common/SearchBar'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { ChildrenQuery, SchoolRole, useChildrenQuery } from '../../../../types/graphql'

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
      return params.row.parentRole?.relation
    },
  },
  {
    width: 250,
    field: 'school',
    headerName: 'School',
    valueGetter(params) {
      const roles = params.row.roles.filter((e) => e.role === 'ATHLETE') as SchoolRole[]
      return roles.map((e) => e.school.name)
    },
    valueFormatter(params) {
      return params.value.join(', ')
    },
  },
  {
    width: 200,
    field: 'score',
    headerName: 'Score',
    renderCell() {
      return (
        <Stack spacing={1} direction="row" alignItems="center">
          <CircularProgress color="success" size={20} variant="determinate" value={100} />
          <Typography color="success.main">Good (100%)</Typography>
        </Stack>
      )
    },
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
      href={(e) => `/dashboard/parent/child/${e.id}`}
      initialSortModel={{ field: 'createdAt', sort: 'desc' }}
      actions={
        <DataGridActions>
          <SearchBar onSearch={(search) => query.refetch({ search })} />
        </DataGridActions>
      }
    />
  )
}

export default withDashboardLayout(Home, {
  title: 'Home',
})
