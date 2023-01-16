import { Chip } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { DataGridViewer, InferNodeType } from '../../../../components/common/DataGridViewer'
import { SearchBar } from '../../../../components/common/SearchBar'
import { UserEmail } from '../../../../components/common/UserEmail'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { roleDisplayTitle } from '../../../../helpers/formatters'
import { MembersQuery, useMembersQuery } from '../../../../types/graphql'

const columns: GridColumns<InferNodeType<MembersQuery['members']>> = [
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
    width: 200,
    field: 'role',
    sortable: false,
    headerName: 'Role',
    valueGetter(params) {
      return params.row.teamRole?.role
    },
    renderCell(params) {
      if (params.value) {
        return <Chip label={roleDisplayTitle(params.value)} />
      }
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
  const query = useMembersQuery()

  return (
    <DataGridViewer
      query={query}
      title="Members"
      columns={columns}
      data={query.data?.members}
      actions={<SearchBar onSearch={(search) => query.refetch({ search })} />}
    />
  )
}

export default withDashboardLayout(Members, {
  title: 'Members',
})
