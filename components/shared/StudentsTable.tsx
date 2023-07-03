import AddIcon from '@mui/icons-material/AddOutlined'
import UploadIcon from '@mui/icons-material/UploadFileOutlined'
import { ListItemIcon, ListItemText, MenuItem, Stack } from '@mui/material'
import { LinkProps } from 'next/link'
import { SocialNameEnum, UsersQuery, useUsersQuery } from '../../schema'
import { useAlert } from '../../utils/context/alert'
import { AvatarWithName } from '../common/AvatarWithName'
import { ButtonSplitMenu } from '../common/ButtonSplitMenu'
import { DataGridActions, DataGridViewer, InferColType } from '../common/DataGridViewer'
import { PlatformChip } from '../common/PlatformChip'
import { SearchBar } from '../common/SearchBar'
import { InviteStudentAndParentForm } from '../forms/InviteStudentAndParentForm'
import { ImportStudentsModal } from './ImportStudentsModal'

const columns: InferColType<UsersQuery['users']> = [
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
    width: 350,
    sortable: false,
    field: 'platforms',
    headerName: 'Platforms',
    renderCell(params) {
      return (
        <Stack direction="row" spacing={0.5}>
          {params.row.platforms.map((platform) => (
            <PlatformChip key={platform.id} platform={platform.__typename!.toUpperCase() as SocialNameEnum} />
          ))}
        </Stack>
      )
    },
  },
  {
    width: 200,
    sortable: false,
    field: 'parentalApproval',
    headerName: 'Parental Approval',
    valueFormatter(params) {
      if (typeof params.value === 'boolean') {
        return params.value ? 'Yes' : 'No'
      }
      return 'Pending'
    },
  },
  {
    width: 200,
    sortable: false,
    field: 'score',
    headerName: 'Score',
    renderCell(params) {
      return Math.round(params.row.score * 100) + '%'
    },
  },
]

export function StudentsTable({ schoolId, href }: { schoolId: string; href?: (id: string) => LinkProps['href'] }) {
  const { pushAlert } = useAlert()

  const query = useUsersQuery({
    variables: {
      filter: {
        from: 'SCHOOL',
        roles: ['STUDENT'],
        fromId: schoolId,
      },
      order: {},
    },
  })

  return (
    <DataGridViewer
      query={query}
      title="Students"
      columns={columns}
      data={query.data?.users}
      href={href ? (e) => href(e.id) : undefined}
      initialSortModel={{ field: 'createdAt', sort: 'desc' }}
      actions={
        <DataGridActions>
          <ButtonSplitMenu
            title="Invite Student"
            startIcon={<AddIcon />}
            onClick={() => {
              pushAlert({
                title: '',
                type: 'custom',
                props: { schoolId },
                content: InviteStudentAndParentForm,
              })
            }}
          >
            <MenuItem
              onClick={() => {
                pushAlert({
                  title: '',
                  type: 'custom',
                  maxWidth: 'lg',
                  props: { schoolId },
                  content: ImportStudentsModal,
                })
              }}
            >
              <ListItemIcon>
                <UploadIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Import from File</ListItemText>
            </MenuItem>
          </ButtonSplitMenu>
          <SearchBar onSearch={(search) => query.refetch({ filter: { ...query.variables?.filter, search } })} />
        </DataGridActions>
      }
    />
  )
}
