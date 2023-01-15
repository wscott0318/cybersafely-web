import AddIcon from '@mui/icons-material/AddOutlined'
import { Chip, MenuItem } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { DataGridViewer, InferNodeType } from '../../../../components/common/DataGridViewer'
import { DropDownButton } from '../../../../components/common/DropDownButton'
import { SearchBar } from '../../../../components/common/SearchBar'
import { UserEmail } from '../../../../components/common/UserEmail'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { roleDisplayTitle } from '../../../../helpers/formatters'
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
    field: 'role',
    sortable: false,
    headerName: 'Role',
    valueGetter(params) {
      return params.row.teamRole?.role
    },
    renderCell(params) {
      if (params.value) {
        return <Chip label={roleDisplayTitle(params.value)} />
      }
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
      actions={
        <>
          <DropDownButton startIcon={<AddIcon />} title="Invite">
            <MenuItem
              onClick={async () => {
                pushAlert(
                  'Invite coach',
                  'Enter the e-mail below:',
                  (email) => {
                    inviteCoach({ variables: { email } })
                  },
                  true
                )
              }}
            >
              Invite Coach
            </MenuItem>
            <MenuItem
              onClick={async () => {
                pushAlert(
                  'Invite athlete',
                  'Enter the e-mail below:',
                  (email) => {
                    inviteAthlete({ variables: { email } })
                  },
                  true
                )
              }}
            >
              Invite Athlete
            </MenuItem>
          </DropDownButton>
          <SearchBar onSearch={(search) => query.refetch({ search })} />
        </>
      }
    />
  )
}

export default withDashboardLayout(Members, {
  title: 'Members',
})
