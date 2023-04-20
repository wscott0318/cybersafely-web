import AddIcon from '@mui/icons-material/AddOutlined'
import { Button } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { useMemo } from 'react'
import { AvatarWithName } from '../../../../components/common/AvatarWithName'
import { DataGridActions, DataGridViewer, InferNodeType } from '../../../../components/common/DataGridViewer'
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
]

function Members() {
  const { pushAlert } = useAlert()
  const schoolRole = useSchoolRole()

  const query = useUsersQuery({
    variables: {
      filter: {
        from: 'SCHOOL',
        fromId: schoolRole!.school.id,
      },
    },
  })

  const [createUserRole] = useCreateUserRoleMutation({
    refetchQueries: [namedOperations.Query.users],
  })

  const columns = useMemo(() => getColumns(schoolRole!.school.id), [schoolRole])

  return (
    <DataGridViewer
      query={query}
      title="Members"
      columns={columns}
      data={query.data?.users}
      href={(e) => ({
        pathname: '/dashboard/coach/members/[memberId]',
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
                props: { allow: ['COACH', 'STUDENT'] },
                result: ({ email, type }) => {
                  createUserRole({ variables: { input: { email, type, relationId: schoolRole!.school.id } } })
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
