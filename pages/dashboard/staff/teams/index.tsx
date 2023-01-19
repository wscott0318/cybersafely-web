import AddIcon from '@mui/icons-material/AddOutlined'
import { Button } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { DataGridViewer, InferNodeType } from '../../../../components/common/DataGridViewer'
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
      actions={[
        <Button
          fullWidth
          startIcon={<AddIcon />}
          onClick={async () => {
            pushAlert({
              type: 'result',
              title: 'Create Team',
              message: 'Enter a name below',
              label: 'Name',
              resultType: 'email',
              result: (name) => {
                createTeam({ variables: { input: { name } } })
              },
            })
          }}
        >
          Create Team
        </Button>,
        <SearchBar onSearch={(search) => query.refetch({ search })} />,
      ]}
    />
  )
}

export default withDashboardLayout(Teams, {
  title: 'Teams',
})
