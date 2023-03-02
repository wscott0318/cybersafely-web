import AddIcon from '@mui/icons-material/AddOutlined'
import { Button } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { AvatarWithName } from '../../../../components/common/AvatarWithName'
import { DataGridActions, DataGridViewer, InferNodeType } from '../../../../components/common/DataGridViewer'
import { SearchBar } from '../../../../components/common/SearchBar'
import { UserEmail } from '../../../../components/common/UserEmail'
import { UserRoles } from '../../../../components/common/UserRoles'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { InviteUserForm } from '../../../../components/forms/InviteUserForm'
import { namedOperations, useCreateUserRoleMutation, UsersQuery, useUsersQuery } from '../../../../schema'
import { useAlert } from '../../../../utils/context/alert'

const columns: GridColumns<InferNodeType<UsersQuery['users']>> = [
  {
    width: 250,
    field: 'name',
    headerName: 'Name',
    renderCell(params) {
      return <AvatarWithName src={params.row.avatar?.url} name={params.row.name} />
    },
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
    width: 350,
    field: 'roles',
    headerName: 'Roles',
    valueGetter(params) {
      return params.row.roles
    },
    renderCell(params) {
      return <UserRoles roles={params.value} canRemove />
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

  const [createUserRole] = useCreateUserRoleMutation({
    refetchQueries: [namedOperations.Query.users],
  })

  return (
    <DataGridViewer
      title="Users"
      query={query}
      columns={columns}
      data={query.data?.users}
      initialSortModel={{ field: 'createdAt', sort: 'desc' }}
      actions={
        <DataGridActions>
          <Button
            fullWidth
            startIcon={<AddIcon />}
            onClick={() => {
              pushAlert({
                type: 'custom',
                title: 'Invite Staff',
                content: InviteUserForm,
                props: { allow: ['STAFF'] },
                result: ({ email }) => {
                  createUserRole({ variables: { input: { email, type: 'STAFF' } } })
                },
              })
            }}
          >
            Invite Staff
          </Button>
          <SearchBar onSearch={(search) => query.refetch({ search })} />
        </DataGridActions>
      }
    />
  )
}

export default withDashboardLayout(Users, {
  title: 'Users',
})
