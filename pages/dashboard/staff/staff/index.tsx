import AddIcon from '@mui/icons-material/AddOutlined'
import { Button } from '@mui/material'
import { AvatarWithName } from '../../../../components/common/AvatarWithName'
import { DataGridActions, DataGridViewer, InferColType } from '../../../../components/common/DataGridViewer'
import { DropDownButton } from '../../../../components/common/DropDownButton'
import { ResendInviteMenuItem } from '../../../../components/common/ResendInviteMenuItem'
import { SearchBar } from '../../../../components/common/SearchBar'
import { UserRoles } from '../../../../components/common/UserRoles'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { InviteUserForm } from '../../../../components/forms/InviteUserForm'
import {
  UserRoleStatusEnum,
  UserRoleTypeEnum,
  UsersQuery,
  namedOperations,
  useCreateUserRoleMutation,
  useUsersQuery,
} from '../../../../schema'
import { useAlert } from '../../../../utils/context/alert'

const columns: InferColType<UsersQuery['users']> = [
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
  },
  {
    width: 350,
    field: 'role',
    headerName: 'Role',
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
  {
    width: 200,
    field: 'actions',
    type: 'actions',
    renderCell(params) {
      const userRole = params.row.roles.find((e) => e.type === UserRoleTypeEnum.Staff)
      return (
        userRole?.status === UserRoleStatusEnum.Pending && (
          <DropDownButton>
            <ResendInviteMenuItem title="Resend Invite" userRoleId={userRole!.id} />
          </DropDownButton>
        )
      )
    },
  },
]

function Staff() {
  const { pushAlert } = useAlert()

  const query = useUsersQuery({
    variables: { filter: { roles: ['STAFF'] } },
  })

  const [createUserRole] = useCreateUserRoleMutation({
    refetchQueries: [namedOperations.Query.users],
  })

  return (
    <DataGridViewer
      title="Staff"
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
          <SearchBar onSearch={(search) => query.refetch({ filter: { ...query.variables?.filter, search } })} />
        </DataGridActions>
      }
    />
  )
}

export default withDashboardLayout(Staff, {
  title: 'Staff',
})
