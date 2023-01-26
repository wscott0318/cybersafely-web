import AddIcon from '@mui/icons-material/AddOutlined'
import PersonAddIcon from '@mui/icons-material/PersonAddOutlined'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { DataGridActions, DataGridViewer, InferNodeType } from '../../../../components/common/DataGridViewer'
import { DropDownButton } from '../../../../components/common/DropDownButton'
import { SearchBar } from '../../../../components/common/SearchBar'
import { UserEmail } from '../../../../components/common/UserEmail'
import { UserRoles } from '../../../../components/common/UserRoles'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { MemberActions } from '../../../../components/data/MemberActions'
import { InviteEmailForm } from '../../../../components/form/InviteEmailForm'
import {
  MembersQuery,
  namedOperations,
  useInviteAthleteMutation,
  useInviteCoachMutation,
  useMembersQuery,
} from '../../../../types/graphql'
import { useAlert } from '../../../../utils/context/alert'

const columns: GridColumns<InferNodeType<MembersQuery['members']>> = [
  {
    width: 250,
    field: 'name',
    headerName: 'Name',
  },
  {
    width: 300,
    field: 'email',
    headerName: 'E-mail',
    valueGetter(params) {
      return params.row
    },
    renderCell(params) {
      return <UserEmail {...params.value} />
    },
  },
  {
    width: 200,
    field: 'roles',
    sortable: false,
    headerName: 'Roles',
    valueGetter(params) {
      return params.row.roles
    },
    renderCell(params) {
      return <UserRoles roles={params.value} />
    },
  },
  {
    width: 150,
    field: 'parentCount',
    headerName: 'Parents',
  },
  {
    width: 200,
    field: 'createdAt',
    headerName: 'Joined',
    valueFormatter(params) {
      return new Date(params.value).toLocaleString()
    },
  },
  {
    width: 200,
    field: 'actions',
    type: 'actions',
    renderCell(params) {
      return <MemberActions memberId={params.row.id} />
    },
  },
]

function Members() {
  const { pushAlert } = useAlert()

  const query = useMembersQuery()

  const [inviteCoach] = useInviteCoachMutation({
    refetchQueries: [namedOperations.Query.members],
  })
  const [inviteAthlete] = useInviteAthleteMutation({
    refetchQueries: [namedOperations.Query.members],
  })

  return (
    <DataGridViewer
      query={query}
      title="Members"
      columns={columns}
      data={query.data?.members}
      href={(e) => `/dashboard/coach/members/${e.id}`}
      initialSortModel={{ field: 'createdAt', sort: 'desc' }}
      actions={
        <DataGridActions>
          <DropDownButton startIcon={<AddIcon />} title="Invite" fullWidth>
            <MenuItem
              onClick={() => {
                pushAlert({
                  type: 'custom',
                  title: 'Invite Coach',
                  message: 'Enter an e-mail below',
                  content: InviteEmailForm,
                  result: (variables) => {
                    inviteCoach({ variables })
                  },
                })
              }}
            >
              <ListItemIcon>
                <PersonAddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Invite Coach</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                pushAlert({
                  type: 'custom',
                  title: 'Invite Athlete',
                  message: 'Enter an e-mail below',
                  content: InviteEmailForm,
                  result: (variables) => {
                    inviteAthlete({ variables })
                  },
                })
              }}
            >
              <ListItemIcon>
                <PersonAddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Invite Athlete</ListItemText>
            </MenuItem>
          </DropDownButton>
          <SearchBar onSearch={(search) => query.refetch({ search })} />
        </DataGridActions>
      }
    />
  )
}

export default withDashboardLayout(Members, {
  title: 'Members',
})
