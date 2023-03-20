import OpenIcon from '@mui/icons-material/OpenInNewOutlined'
import { Button, Checkbox, MenuItem, Select, Stack, Typography } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { useQueryParam } from '../../helpers/hooks'
import { PostsQuery, usePostsQuery } from '../../schema'
import { useSchoolRole } from '../../utils/context/auth'
import { AvatarWithName } from '../common/AvatarWithName'
import { DataGridActions, DataGridViewer, InferNodeType } from '../common/DataGridViewer'

const columns: GridColumns<InferNodeType<PostsQuery['posts']>> = [
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
    field: 'media',
    sortable: false,
    headerName: 'Media',
    valueGetter(params) {
      return params.row.media.length
    },
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

type PostsForAdminAndCoachProps = {
  baseURL: string
}

export function PostsForAdminAndCoach({ baseURL }: PostsForAdminAndCoachProps) {
  const schoolRole = useSchoolRole()

  const [flagged, setFlagged] = useQueryParam('flagged', 'boolean')

  const query = usePostsQuery({
    variables: {
      filter: { flagged },
      schoolId: schoolRole!.school.id,
    },
  })

  return (
    <DataGridViewer
      title="Posts"
      query={query}
      columns={columns}
      data={query.data?.posts}
      href={(e) => baseURL + '/posts/' + e.id}
      actions={
        <DataGridActions>
          <Select
            variant="outlined"
            value={flagged === undefined ? '-' : flagged === true ? 'true' : 'false'}
            onChange={(e) => setFlagged(e.target.value === '-' ? undefined : e.target.value === 'true')}
          >
            <MenuItem value="-">All</MenuItem>
            <MenuItem value="true">Flagged</MenuItem>
            <MenuItem value="false">Not Flagged</MenuItem>
          </Select>
        </DataGridActions>
      }
    />
  )
}
