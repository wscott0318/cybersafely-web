import { Chip } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { AvatarWithName } from '../../../../components/common/AvatarWithName'
import { DataGridActions, DataGridViewer, InferNodeType } from '../../../../components/common/DataGridViewer'
import { SearchBar } from '../../../../components/common/SearchBar'
import { UserScore } from '../../../../components/common/UserScore'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { TempPaginatedItemQuery, useTempPaginatedItemQuery } from '../../../../types/graphql'

const columns: GridColumns<InferNodeType<TempPaginatedItemQuery['tempPaginatedItem']>> = [
  {
    width: 250,
    field: 'athlete',
    headerName: 'Athlete',
    renderCell() {
      return <AvatarWithName name="Some Athlete" />
    },
  },
  {
    width: 250,
    field: 'date',
    headerName: 'Date',
    valueFormatter() {
      return new Date().toLocaleString()
    },
  },
  {
    width: 150,
    field: 'platform',
    headerName: 'Platform',
    renderCell() {
      return <Chip color="default" label="TikTok" />
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

function Posts() {
  const query = useTempPaginatedItemQuery()

  return (
    <DataGridViewer
      query={query}
      title="Posts"
      columns={columns}
      data={query.data?.tempPaginatedItem}
      href={(e) => `/dashboard/coach/posts/${e.id}`}
      actions={
        <DataGridActions>
          <SearchBar onSearch={() => {}} />
        </DataGridActions>
      }
    />
  )
}

export default withDashboardLayout(Posts, {
  title: 'Posts',
})
