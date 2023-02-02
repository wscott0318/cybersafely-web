import AddIcon from '@mui/icons-material/AddOutlined'
import { Button } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { DataGridActions, DataGridViewer, InferNodeType } from '../../../../components/common/DataGridViewer'
import { SearchBar } from '../../../../components/common/SearchBar'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { namedOperations, SchoolsQuery, useCreateSchoolMutation, useSchoolsQuery } from '../../../../types/graphql'
import { useAlert } from '../../../../utils/context/alert'

const columns: GridColumns<InferNodeType<SchoolsQuery['schools']>> = [
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

function Schools() {
  const { pushAlert } = useAlert()

  const query = useSchoolsQuery()

  const [createSchool] = useCreateSchoolMutation({
    refetchQueries: [namedOperations.Query.schools],
  })

  return (
    <DataGridViewer
      title="Schools"
      query={query}
      columns={columns}
      data={query.data?.schools}
      href={(e) => `/dashboard/staff/schools/${e.id}`}
      initialSortModel={{ field: 'createdAt', sort: 'desc' }}
      actions={
        <DataGridActions>
          <Button
            fullWidth
            startIcon={<AddIcon />}
            onClick={() => {
              pushAlert({
                type: 'result',
                title: 'Create School',
                message: 'Enter a name below',
                label: 'Name',
                result: (name) => {
                  createSchool({ variables: { input: { name } } })
                },
              })
            }}
          >
            Create School
          </Button>
          <SearchBar onSearch={(search) => query.refetch({ search })} />
        </DataGridActions>
      }
    />
  )
}

export default withDashboardLayout(Schools, {
  title: 'Schools',
})
