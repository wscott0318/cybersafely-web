import { Link } from '@mui/material'
import { AvatarWithName } from '../../../../components/common/AvatarWithName'
import { DataGridActions, DataGridViewer, InferColType } from '../../../../components/common/DataGridViewer'
import { NextLink } from '../../../../components/common/NextLink'
import { SearchBar } from '../../../../components/common/SearchBar'
import { UserRoles } from '../../../../components/common/UserRoles'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { UsersQuery, useUsersQuery } from '../../../../schema'

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
    width: 300,
    field: 'school',
    headerName: 'School',
    valueGetter(params) {
      return params.row.roles.map((e) => (e.__typename === 'SchoolRole' ? e.school : undefined)).filter((e) => !!e)
    },
    renderCell(params) {
      return (
        <>
          {params.value.map((school: any, index: number, { length }: { length: number }) => (
            <>
              <NextLink href={{ pathname: '/dashboard/staff/schools/[schoolId]', query: { schoolId: school.id } }}>
                <Link>{school.name}</Link>
              </NextLink>
              {index < length - 1 && ', '}
            </>
          ))}
        </>
      )
    },
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
]

function Users() {
  const query = useUsersQuery({
    variables: { filter: { roles: ['ADMIN', 'COACH', 'STUDENT', 'PARENT'] } },
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
          <SearchBar onSearch={(search) => query.refetch({ filter: { ...query.variables?.filter, search } })} />
        </DataGridActions>
      }
    />
  )
}

export default withDashboardLayout(Users, {
  title: 'Users',
})
