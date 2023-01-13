import VerifiedIcon from '@mui/icons-material/Verified'
import { Chip, Tooltip } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { DataGridViewer, InferNodeType } from '../../../../components/common/DataGridViewer'
import { withDashboardLayout } from '../../../../components/dashboard/layout'
import { Role, UsersQuery, useUsersQuery } from '../../../../types/graphql'

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
      const { email, emailConfirmed } = params.value

      return (
        <>
          <Tooltip title={emailConfirmed ? 'E-mail is confirmed' : 'E-mail is not confirmed'}>
            <VerifiedIcon color={emailConfirmed ? 'primary' : 'disabled'} sx={{ mr: 0.5 }} />
          </Tooltip>
          {email}
        </>
      )
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
      return params.value.map((role: Role) => <Chip label={roleDisplayTitle(role)} sx={{ mr: 0.5 }} />)
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

function roleDisplayTitle(role: Role) {
  switch (role) {
    case 'STAFF':
      return 'Staff'
    case 'COACH':
      return 'Coach'
    case 'ATHLETE':
      return 'Athlete'
    case 'PARENT':
      return 'Parent'
  }
}

function Users() {
  const query = useUsersQuery()

  return (
    <DataGridViewer
      title="Users"
      query={query}
      columns={columns}
      data={query.data?.users}
      href={(e) => '/dashboard/staff/users/' + e.id}
    />
  )
}

export default withDashboardLayout(Users, {
  title: 'Staff Dashboard',
})
