import { Box, Grid } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { DataGridActions, DataGridViewer, InferNodeType } from '../../../../components/common/DataGridViewer'
import { SearchBar } from '../../../../components/common/SearchBar'
import { UserScore } from '../../../../components/common/UserScore'
import { WelcomeCard } from '../../../../components/common/WelcomeCard'
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
      return <UserScore />
    },
  },
]

function Home() {
  const query = useChildrenQuery()

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <WelcomeCard />
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
      </Grid>
    </Box>
  )
}

export default withDashboardLayout(Home, {
  title: 'Home',
})
