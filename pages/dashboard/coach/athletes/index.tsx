import AddIcon from '@mui/icons-material/AddOutlined'
import UploadIcon from '@mui/icons-material/UploadFileOutlined'
import { ListItemIcon, ListItemText, MenuItem, Stack } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { AvatarWithName } from '../../../../components/common/AvatarWithName'
import { ButtonSplitMenu } from '../../../../components/common/ButtonSplitMenu'
import { DataGridActions, DataGridViewer, InferNodeType } from '../../../../components/common/DataGridViewer'
import { PlatformChip } from '../../../../components/common/PlatformChip'
import { SearchBar } from '../../../../components/common/SearchBar'
import { UserScore } from '../../../../components/common/UserScore'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { InviteAthleteAndParentForm } from '../../../../components/forms/InviteAthleteAndParentForm'
import {
  IMPORT_ACCEPT,
  InviteAthleteAndParentTableForm,
} from '../../../../components/forms/InviteAthleteAndParentTableForm'
import { UsersQuery, useUsersQuery } from '../../../../schema'
import { useAlert } from '../../../../utils/context/alert'
import { useSchoolRole } from '../../../../utils/context/auth'
import { useFilePicker } from '../../../../utils/upload'

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
    width: 350,
    field: 'platforms',
    headerName: 'Platforms',
    renderCell(params) {
      return (
        <Stack direction="row" spacing={0.5}>
          {params.row.platforms.map((platform) => (
            <PlatformChip key={platform} platform={platform} />
          ))}
        </Stack>
      )
    },
  },
  {
    width: 200,
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
  const { pick } = useFilePicker()
  const { pushAlert } = useAlert()
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
      href={(e) => ({ pathname: '/dashboard/coach/members/[memberId]', query: { memberId: e.id } })}
      actions={
        <DataGridActions>
          <ButtonSplitMenu
            title="Invite Athlete"
            startIcon={<AddIcon />}
            onClick={() => {
              pushAlert({
                type: 'custom',
                title: 'Invite Athlete',
                content: InviteAthleteAndParentForm,
                props: { schoolId: schoolRole!.school.id },
              })
            }}
          >
            <MenuItem
              onClick={async () => {
                const file = await pick(IMPORT_ACCEPT)

                if (file) {
                  pushAlert({
                    type: 'custom',
                    maxWidth: 'lg',
                    title: 'Import from File',
                    content: InviteAthleteAndParentTableForm,
                    props: { schoolId: schoolRole!.school.id, file },
                  })
                }
              }}
            >
              <ListItemIcon>
                <UploadIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Import from File...</ListItemText>
            </MenuItem>
          </ButtonSplitMenu>
          <SearchBar onSearch={(search) => query.refetch({ filter: { ...query.variables?.filter, search } })} />
        </DataGridActions>
      }
    />
  )
}

export default withDashboardLayout(Athletes, {
  title: 'Athletes',
})
