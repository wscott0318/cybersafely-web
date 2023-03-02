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
import { useSchoolRole } from '../../../../utils/context/auth'

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
    width: 200,
    field: 'roles',
    sortable: false,
    headerName: 'Roles',
    valueGetter(params) {
      return params.row.roles
    },
    renderCell(params) {
      return <UserRoles roles={params.value} />
    },
  },
  {
    width: 150,
    field: 'parentCount',
    headerName: 'Parents',
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

function Members() {
  const { pushAlert } = useAlert()
  const schoolRole = useSchoolRole()

  const query = useUsersQuery({
    variables: {
      from: 'SCHOOL',
      fromId: schoolRole!.school.id,
    },
  })

  const [createUserRole] = useCreateUserRoleMutation({
    refetchQueries: [namedOperations.Query.users],
  })

  return (
    <DataGridViewer
      query={query}
      title="Members"
      columns={columns}
      data={query.data?.users}
      href={(e) => `/dashboard/coach/members/${e.id}`}
      initialSortModel={{ field: 'createdAt', sort: 'desc' }}
      actions={
        <DataGridActions>
          <Button
            fullWidth
            startIcon={<AddIcon />}
            onClick={() => {
              pushAlert({
                type: 'custom',
                title: 'Invite Member',
                message: 'Enter the information below',
                content: InviteUserForm,
                result: ({ email, type }) => {
                  createUserRole({ variables: { input: { email, type, relationId: schoolRole!.school.id } } })
                },
              })
            }}
          >
            Invite Member
          </Button>
          <SearchBar onSearch={(search) => query.refetch({ search })} />
        </DataGridActions>
      }
    />
  )
}

export default withDashboardLayout(Members, {
  title: 'Members',
})
