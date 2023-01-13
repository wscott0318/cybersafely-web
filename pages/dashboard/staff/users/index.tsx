import PlusIcon from '@mui/icons-material/AddOutlined'
import { Button, Checkbox } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { DataGridViewer, InferNodeType } from '../../../../components/common/DataGridViewer'
import { withDashboardLayout } from '../../../../components/dashboard/layout'
import { UsersQuery, useUsersQuery } from '../../../../types/graphql'

const columns: GridColumns<InferNodeType<UsersQuery['users']>> = [
  {
    width: 200,
    field: 'createdAt',
    headerName: 'Joined',
    valueFormatter(params) {
      return new Date(params.value).toLocaleString()
    },
  },
  {
    width: 250,
    field: 'email',
    headerName: 'E-mail',
  },
  {
    width: 250,
    field: 'name',
    headerName: 'Name',
  },
  {
    width: 150,
    field: 'isConfirmed',
    headerName: 'Confirmed',
    renderCell(params) {
      return <Checkbox checked={params.value} readOnly />
    },
  },
  {
    width: 150,
    field: 'isStaff',
    headerName: 'Staff',
    renderCell(params) {
      return <Checkbox checked={params.value} readOnly />
    },
  },
  {
    width: 150,
    field: 'memberships._count',
    headerName: 'Member',
    valueGetter(params) {
      return params.row.memberships.length
    },
    renderCell(params) {
      return <Checkbox checked={params.value > 0} readOnly />
    },
  },
  {
    width: 150,
    field: 'children._count',
    headerName: 'Parent',
    valueGetter(params) {
      return params.row.children.length
    },
    renderCell(params) {
      return <Checkbox checked={params.value > 0} readOnly />
    },
  },
]

function Users() {
  const query = useUsersQuery()

  return (
    <DataGridViewer
      title="Users"
      query={query}
      columns={columns}
      data={query.data?.users}
      href={(e) => '/dashboard/staff/users/' + e.id}
      actions={<Button startIcon={<PlusIcon />}>Invite Staff</Button>}
    />
  )
}

export default withDashboardLayout(Users, {
  title: 'Staff Dashboard',
})
