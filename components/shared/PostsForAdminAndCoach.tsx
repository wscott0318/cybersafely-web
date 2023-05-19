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
import { PostsQuery, namedOperations, useExecuteActionMutation, usePostsQuery } from '../../schema'
import { useAlert } from '../../utils/context/alert'
import { useSchoolRole } from '../../utils/context/auth'
import { AvatarWithName } from '../common/AvatarWithName'
import { DataGridActions, DataGridViewer, InferNodeType } from '../common/DataGridViewer'
import { DropDownButton } from '../common/DropDownButton'
import { PlatformChip } from '../common/PlatformChip'

export function PostActions({ postId, url }: { postId: string; url: string }) {
  const { pushAlert } = useAlert()

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
        sx={(theme) => ({ color: theme.palette.error.main })}
        onClick={() => {
          executeAction({ variables: { type: 'MARK_AS_NOT_ACCEPTABLE', postId } })
        }}
      >
        <ListItemIcon>
          <CheckIcon fontSize="small" color="error" />
        </ListItemIcon>
        <ListItemText>Mark as Not Acceptable</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={() => {
          executeAction({ variables: { type: 'NOTIFY_STUDENT', postId } })
        }}
      >
        <ListItemIcon>
          <NotifyIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Notify Student</ListItemText>
      </MenuItem>
      <MenuItem
        sx={(theme) => ({ color: theme.palette.error.main })}
        onClick={() => {
          pushAlert({
            type: 'confirm',
            title: 'Confirm',
            message: 'Are you sure you want to take this post down?',
            confirm: () => {
              executeAction({ variables: { type: 'TAKE_DOWN_POST', postId } })
            },
          })
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
    field: 'flagged',
    sortable: false,
    headerName: 'Flagged',
    renderCell(params) {
      return <Checkbox checked={params.row.flagged} />
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

type PostsForAdminAndCoachProps = {}

export function PostsForAdminAndCoach({}: PostsForAdminAndCoachProps) {
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
      href={(e) =>
        schoolRole!.type === 'ADMIN'
          ? { pathname: '/dashboard/admin/posts/[postId]', query: { postId: e.id } }
          : { pathname: '/dashboard/coach/posts/[postId]', query: { postId: e.id } }
      }
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
