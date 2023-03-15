import { Checkbox } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { DataGridViewer, InferNodeType } from '../../../../components/common/DataGridViewer'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { PostsQuery, usePostsQuery } from '../../../../schema'
import { useSchoolRole } from '../../../../utils/context/auth'

const columns: GridColumns<InferNodeType<PostsQuery['posts']>> = [
  {
    width: 300,
    field: 'text',
    sortable: false,
    headerName: 'Text',
  },
  {
    width: 100,
    field: 'flagged',
    sortable: false,
    headerName: 'Flagged',
    renderCell(params) {
      return <Checkbox checked={params.row.flagged} />
    },
  },
]

function Posts() {
  const schoolRole = useSchoolRole()

  const query = usePostsQuery({
    variables: { schoolId: schoolRole!.school.id },
  })

  return <DataGridViewer title="Posts" query={query} columns={columns} data={query.data?.posts} />
}

export default withDashboardLayout(Posts, {
  title: 'Posts',
})
