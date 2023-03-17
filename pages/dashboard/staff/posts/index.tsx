import OpenIcon from '@mui/icons-material/OpenInNewOutlined'
import { Button, Checkbox, Stack, Typography } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { DataGridViewer, InferNodeType } from '../../../../components/common/DataGridViewer'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { useQueryParam } from '../../../../helpers/hooks'
import { PostsQuery, usePostsQuery } from '../../../../schema'

const columns: GridColumns<InferNodeType<PostsQuery['posts']>> = [
  {
    width: 150,
    field: 'url',
    sortable: false,
    headerName: 'URL',
    renderCell(params) {
      return (
        <Button size="small" target="_blank" href={params.row.url} variant="text" startIcon={<OpenIcon />}>
          Open Link
        </Button>
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
    width: 100,
    field: 'flagged',
    sortable: false,
    headerName: 'Flagged',
    renderCell(params) {
      return <Checkbox checked={params.row.flag?.flagged ?? false} />
    },
  },
  {
    width: 300,
    field: 'reasons',
    sortable: false,
    headerName: 'Reasons',
    renderCell(params) {
      if (!params.row.flag) {
        return
      }

      return (
        <Stack spacing={0}>
          {params.row.flag.reasons.map((e) => (
            <Typography variant="body2">{e}</Typography>
          ))}
        </Stack>
      )
    },
  },
]

function Posts() {
  const [flagged] = useQueryParam('flagged', 'boolean')

  const query = usePostsQuery({
    variables: { filter: { flagged } },
  })

  return <DataGridViewer title="Posts" query={query} columns={columns} data={query.data?.posts} />
}

export default withDashboardLayout(Posts, {
  title: 'Posts',
})
