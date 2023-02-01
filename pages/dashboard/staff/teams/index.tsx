import AddIcon from '@mui/icons-material/AddOutlined'
import { Button } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { DataGridActions, DataGridViewer, InferNodeType } from '../../../../components/common/DataGridViewer'
import { SearchBar } from '../../../../components/common/SearchBar'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { namedOperations, TeamsQuery, useCreateTeamMutation, useTeamsQuery } from '../../../../types/graphql'
import { useAlert } from '../../../../utils/context/alert'

const columns: GridColumns<InferNodeType<TeamsQuery['teams']>> = [
  {
    width: 250,
    field: 'name',
    headerName: 'Name',
  },
  {
    width: 350,
    sortable: false,
    field: 'address.formatted',
    headerName: 'Address',
    valueGetter(params) {
      return params.row.address?.formatted
    },
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
  const { pushAlert } = useAlert()

  const query = useTeamsQuery()

  const [createTeam] = useCreateTeamMutation({
    refetchQueries: [namedOperations.Query.teams],
  })

  return (
    <DataGridViewer
      title="Teams"
      query={query}
      columns={columns}
      data={query.data?.teams}
      href={(e) => `/dashboard/staff/teams/${e.id}`}
      initialSortModel={{ field: 'createdAt', sort: 'desc' }}
      actions={
        <DataGridActions>
          <Button
            fullWidth
            startIcon={<AddIcon />}
            onClick={() => {
              pushAlert({
                type: 'result',
                title: 'Create Team',
                message: 'Enter a name below',
                label: 'Name',
                result: (name) => {
                  createTeam({ variables: { input: { name } } })
                },
              })
            }}
          >
            Create Team
          </Button>
          <SearchBar onSearch={(search) => query.refetch({ search })} />
        </DataGridActions>
      }
    />
  )
}

export default withDashboardLayout(Teams, {
  title: 'Teams',
})
