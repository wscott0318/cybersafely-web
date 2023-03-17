import { GridColumns } from '@mui/x-data-grid'
import { AvatarWithName } from '../../../../components/common/AvatarWithName'
import { DataGridActions, DataGridViewer, InferNodeType } from '../../../../components/common/DataGridViewer'
import { SearchBar } from '../../../../components/common/SearchBar'
import { UserScore } from '../../../../components/common/UserScore'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { UsersQuery, useUsersQuery } from '../../../../schema'
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
  },
  {
    width: 150,
    field: 'posts',
    headerName: 'Posts',
    valueGetter() {
      return 100
    },
  },
  {
    width: 200,
    field: 'score',
    headerName: 'Score',
    renderCell() {
      return <UserScore />
    },
  },
]

function Athletes() {
  const schoolRole = useSchoolRole()

  const query = useUsersQuery({
    variables: {
      filter: {
        from: 'SCHOOL',
        roles: ['ATHLETE'],
        fromId: schoolRole!.school.id,
      },
    },
  })

  return (
    <DataGridViewer
      query={query}
      title="Athletes"
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

export default withDashboardLayout(Athletes, {
  title: 'Athletes',
})
