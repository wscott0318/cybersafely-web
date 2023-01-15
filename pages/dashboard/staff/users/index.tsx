import AddIcon from '@mui/icons-material/AddOutlined'
import { Button, Chip } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { DataGridViewer, InferNodeType } from '../../../../components/common/DataGridViewer'
import { SearchBar } from '../../../../components/common/SearchBar'
import { UserEmail } from '../../../../components/common/UserEmail'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { roleDisplayTitle } from '../../../../helpers/formatters'
import { namedOperations, Role, useInviteStaffMutation, UsersQuery, useUsersQuery } from '../../../../types/graphql'
import { useAlert } from '../../../../utils/context/alert'

const columns: GridColumns<InferNodeType<UsersQuery['users']>> = [
  {
    width: 250,
    field: 'name',
    headerName: 'Name',
  },
  {
    width: 300,
    field: 'email',
    headerName: 'E-mail',
    valueGetter(params) {
      return params.row
    },
    renderCell(params) {
      return <UserEmail {...params.value} />
    },
  },
  {
    width: 200,
    field: 'roles',
    sortable: false,
    headerName: 'Roles',
    valueGetter(params) {
      return params.row.roles.map((e) => e.role)
    },
    renderCell(params) {
      return params.value.map((role: Role) => <Chip key={role} label={roleDisplayTitle(role)} sx={{ mr: 0.5 }} />)
    },
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

function Users() {
  const { pushAlert } = useAlert()

  const query = useUsersQuery()

  const [inviteStaff] = useInviteStaffMutation({
    refetchQueries: [namedOperations.Query.users],
  })

  return (
    <DataGridViewer
      title="Users"
      query={query}
      columns={columns}
      data={query.data?.users}
      actions={
        <>
          <Button
            startIcon={<AddIcon />}
            onClick={async () => {
              pushAlert(
                'Invite staff',
                'E-mail',
                (email) => {
                  inviteStaff({ variables: { email } })
                },
                true
              )
            }}
          >
            Invite Staff
          </Button>
          <SearchBar onSearch={(search) => query.refetch({ search })} />
        </>
      }
    />
  )
}

export default withDashboardLayout(Users, {
  title: 'Users',
})
