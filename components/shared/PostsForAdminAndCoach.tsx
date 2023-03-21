import CheckIcon from '@mui/icons-material/CheckCircleOutlined'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import FilterIcon from '@mui/icons-material/FilterAltOutlined'
import NotifyIcon from '@mui/icons-material/NotificationsOutlined'
import OpenIcon from '@mui/icons-material/OpenInNewOutlined'
import {
  Checkbox,
  Divider,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { useQueryParam } from '../../helpers/hooks'
import { namedOperations, PostsQuery, useExecuteActionMutation, usePostsQuery } from '../../schema'
import { useSchoolRole } from '../../utils/context/auth'
import { AvatarWithName } from '../common/AvatarWithName'
import { DataGridActions, DataGridViewer, InferNodeType } from '../common/DataGridViewer'
import { DropDownButton } from '../common/DropDownButton'
import { PlatformChip } from '../common/PlatformChip'

export function PostActions({ postId, url }: { postId: string; url: string }) {
  const [executeAction] = useExecuteActionMutation({
    refetchQueries: [namedOperations.Query.posts, namedOperations.Query.post],
  })

  return (
    <DropDownButton>
      <MenuItem component="a" target="_blank" href={url}>
        <ListItemIcon>
          <OpenIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Open Link</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={() => {
          executeAction({ variables: { type: 'MARK_AS_ACCEPTABLE', postId } })
        }}
      >
        <ListItemIcon>
          <CheckIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Mark as Acceptable</ListItemText>
      </MenuItem>
      <MenuItem
        onClick={() => {
          executeAction({ variables: { type: 'NOTIFY_ATHLETE', postId } })
        }}
      >
        <ListItemIcon>
          <NotifyIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Notify Athlete</ListItemText>
      </MenuItem>
      <MenuItem
        sx={(theme) => ({
          color: theme.palette.error.main,
        })}
        onClick={() => {
          executeAction({ variables: { type: 'TAKE_DOWN_POST', postId } })
        }}
      >
        <ListItemIcon>
          <DeleteIcon fontSize="small" color="error" />
        </ListItemIcon>
        <ListItemText>Take Down Post</ListItemText>
      </MenuItem>
    </DropDownButton>
  )
}

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
    field: 'flagged',
    sortable: false,
    headerName: 'Flagged',
    renderCell(params) {
      return <Checkbox checked={params.row.flag?.flagged ?? false} />
    },
  },
  {
    width: 250,
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
  {
    width: 250,
    field: 'latestAction',
    sortable: false,
    headerName: 'Latest Action',
  },
  {
    width: 200,
    field: 'actions',
    type: 'actions',
    renderCell(params) {
      return <PostActions url={params.row.url} postId={params.row.id} />
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
            startAdornment={
              <InputAdornment position="start">
                <FilterIcon fontSize="small" />
              </InputAdornment>
            }
          >
            <MenuItem value="-">All Posts</MenuItem>
            <MenuItem value="true">Flagged Posts</MenuItem>
            <MenuItem value="false">Not Flagged Posts</MenuItem>
          </Select>
        </DataGridActions>
      }
    />
  )
}
