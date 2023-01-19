import AddIcon from '@mui/icons-material/AddOutlined'
import { Box, Button } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { DataGridViewer, InferNodeType } from '../../../../components/common/DataGridViewer'
import { RoleChip } from '../../../../components/common/RoleChip'
import { SearchBar } from '../../../../components/common/SearchBar'
import { UserEmail } from '../../../../components/common/UserEmail'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import {
  namedOperations,
  useInviteStaffMutation,
  useRemoveRoleMutation,
  UserRole,
  UsersQuery,
  useUsersQuery,
} from '../../../../types/graphql'
import { useAlert } from '../../../../utils/context/alert'

function UserRolesColumn({ roles }: { roles: UserRole[] }) {
  const { pushAlert } = useAlert()

  const [removeRole] = useRemoveRoleMutation({
    refetchQueries: [namedOperations.Query.users],
  })

  return (
    <>
      {roles.map(({ id, role, status }: UserRole) => (
        <Box key={id} mr={0.5}>
          <RoleChip
            role={role}
            status={status}
            onDelete={() => {
              pushAlert({
                type: 'confirm',
                title: 'Remove Role',
                message: `Are you sure you want to remove role "${role}"`,
                confirm: () => {
                  removeRole({ variables: { id } })
                },
              })
            }}
          />
        </Box>
      ))}
    </>
  )
}

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
    width: 350,
    field: 'roles',
    sortable: false,
    headerName: 'Roles',
    valueGetter(params) {
      return params.row.roles
    },
    renderCell(params) {
      return <UserRolesColumn roles={params.value} />
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
      initialSortModel={{ field: 'createdAt', sort: 'desc' }}
      actions={[
        <Button
          fullWidth
          startIcon={<AddIcon />}
          onClick={async () => {
            pushAlert({
              type: 'result',
              title: 'Invite Staff',
              message: 'Enter an e-mail below',
              label: 'E-mail',
              resultType: 'email',
              result: (email) => {
                inviteStaff({ variables: { email } })
              },
            })
          }}
        >
          Invite Staff
        </Button>,
        <SearchBar onSearch={(search) => query.refetch({ search })} />,
      ]}
    />
  )
}

export default withDashboardLayout(Users, {
  title: 'Users',
})
