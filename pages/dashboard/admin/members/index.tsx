import AddIcon from '@mui/icons-material/AddOutlined'
import { Button } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { useMemo } from 'react'
import { AvatarWithName } from '../../../../components/common/AvatarWithName'
import { DataGridActions, DataGridViewer, InferNodeType } from '../../../../components/common/DataGridViewer'
import { DropDownButton } from '../../../../components/common/DropDownButton'
import { RemoveUserRoleMenuItem } from '../../../../components/common/RemoveUserRoleMenuItem'
import { SearchBar } from '../../../../components/common/SearchBar'
import { UserRoles } from '../../../../components/common/UserRoles'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { InviteUserForm } from '../../../../components/forms/InviteUserForm'
import { UsersQuery, namedOperations, useCreateUserRoleMutation, useUsersQuery } from '../../../../schema'
import { useAlert } from '../../../../utils/context/alert'
import { useSchoolRole } from '../../../../utils/context/auth'

const getColumns: (schoolId: string) => GridColumns<InferNodeType<UsersQuery['users']>> = (schoolId) => [
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
    width: 200,
    field: 'role',
    sortable: false,
    headerName: 'Role',
    valueGetter(params) {
      return params.row.roles.find((e) => e.__typename === 'SchoolRole' && e.school.id === schoolId)
    },
    renderCell(params) {
      return <UserRoles roles={[params.value]} />
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
      const userRole = params.row.roles.find((e) => e.__typename === 'SchoolRole' && e.school.id === schoolId)
      return (
        <DropDownButton>
          <RemoveUserRoleMenuItem title="Remove Member" userRoleId={userRole!.id} />
        </DropDownButton>
      )
    },
  },
]

function Members() {
  const userRole = useSchoolRole()
  const { pushAlert } = useAlert()

  const query = useUsersQuery({
    variables: {
      filter: {
        from: 'SCHOOL',
        fromId: userRole!.school.id,
      },
    },
  })

  const [createUserRole] = useCreateUserRoleMutation({
    refetchQueries: [namedOperations.Query.users],
  })

  const columns = useMemo(() => getColumns(userRole!.school.id), [userRole])

  return (
    <DataGridViewer
      query={query}
      title="Members"
      columns={columns}
      data={query.data?.users}
      href={(e) => ({
        pathname: '/dashboard/admin/members/[memberId]',
        query: { memberId: e.id },
      })}
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
                content: InviteUserForm,
                props: { allow: ['ADMIN', 'COACH', 'STUDENT'] },
                result: ({ email, type }) => {
                  createUserRole({ variables: { input: { email, type, relationId: userRole!.school.id } } })
                },
              })
            }}
          >
            Invite Member
          </Button>
          <SearchBar onSearch={(search) => query.refetch({ filter: { ...query.variables?.filter, search } })} />
        </DataGridActions>
      }
    />
  )
}

export default withDashboardLayout(Members, {
  title: 'Members',
})
