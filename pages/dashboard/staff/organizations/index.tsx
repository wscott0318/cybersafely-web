import { GridColumns } from '@mui/x-data-grid'
import { DataGridViewer, InferNodeType } from '../../../../components/common/DataGridViewer'
import { withDashboardLayout } from '../../../../components/dashboard/layout'
import { OrganizationsQuery, useOrganizationsQuery } from '../../../../types/graphql'

const columns: GridColumns<InferNodeType<OrganizationsQuery['organizations']>> = [
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
    field: 'name',
    headerName: 'Name',
  },
  {
    width: 250,
    field: 'address.street',
    headerName: 'Street',
    valueGetter(params) {
      return params.row.address.street
    },
  },
  {
    width: 200,
    field: 'address.city',
    headerName: 'City',
    valueGetter(params) {
      return params.row.address.city
    },
  },
  {
    width: 200,
    field: 'address.state',
    headerName: 'State',
    valueGetter(params) {
      return params.row.address.state
    },
  },
  {
    width: 150,
    field: 'address.zip',
    headerName: 'Zip',
    valueGetter(params) {
      return params.row.address.zip
    },
  },
]

function Organizations() {
  const query = useOrganizationsQuery()

  return (
    <DataGridViewer
      query={query}
      columns={columns}
      title="Organizations"
      data={query.data?.organizations}
      href={(e) => '/dashboard/staff/organizations/' + e.id}
    />
  )
}

export default withDashboardLayout(Organizations, {
  title: 'Staff Dashboard',
})
