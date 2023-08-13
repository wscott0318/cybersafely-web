import { Checkbox, Stack, Typography } from '@mui/material'
import { AvatarWithName } from '../../../../components/common/AvatarWithName'
import { DataGridViewer, InferColType } from '../../../../components/common/DataGridViewer'
import { PlatformChip } from '../../../../components/common/PlatformChip'
import { SeverityImage } from '../../../../components/common/SeverityImage'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { PostsQuery, usePostsQuery } from '../../../../schema'
import { useUser } from '../../../../utils/context/auth'

const columns: InferColType<PostsQuery['posts']> = [
  {
    width: 250,
    field: 'user',
    sortable: false,
    headerName: 'User',
    renderCell(params) {
      return (
        <AvatarWithName src={params.row.user.avatar?.url} name={params.row.user.name} email={params.row.user.email} />
      )
    },
  },
  {
    width: 300,
    field: 'text',
    sortable: false,
    headerName: 'Text',
  },
  {
    width: 150,
    field: 'platform',
    sortable: false,
    headerName: 'Platform',
    renderCell(params) {
      if (!params.row.platform) {
        return '-'
      }
      return <PlatformChip platform={params.row.platform} />
    },
  },
  {
    width: 100,
    field: 'media',
    sortable: false,
    headerName: 'Media',
    valueGetter(params) {
      return params.row.media.length
    },
  },
  {
    width: 100,
    field: 'severity',
    sortable: false,
    headerName: 'Severity',
    renderCell(params) {
      return <SeverityImage severity={params.row.severity} />
    },
  },
  {
    width: 100,
    field: 'manualReview',
    sortable: false,
    headerName: 'Manual Review',
    renderCell(params) {
      return <Checkbox checked={params.row.manualReview} />
    },
  },
  {
    width: 250,
    field: 'reasons',
    sortable: false,
    headerName: 'Reasons',
    renderCell(params) {
      if (!params.row.flag || params.row.flag.reasons.length === 0) {
        return '-'
      }

      return (
        <Stack spacing={0}>
          {params.row.flag.reasons.map((e, index) => (
            <Typography key={String(index)} variant="body2">
              {e}
            </Typography>
          ))}
        </Stack>
      )
    },
  },
]

function Posts() {
  const { user } = useUser()

  const query = usePostsQuery({
    variables: { userId: user.id },
  })

  return (
    <DataGridViewer
      title="Posts"
      query={query}
      columns={columns}
      data={query.data?.posts}
      href={(e) => ({ pathname: '/dashboard/student/posts/[postId]', query: { postId: e.id } })}
    />
  )
}

export default withDashboardLayout(Posts, {
  title: 'Posts',
})
