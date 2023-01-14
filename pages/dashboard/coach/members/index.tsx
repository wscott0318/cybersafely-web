import AddIcon from '@mui/icons-material/AddOutlined'
import VerifiedIcon from '@mui/icons-material/Verified'
import { Chip, MenuItem, Tooltip } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { DataGridViewer, InferNodeType } from '../../../../components/common/DataGridViewer'
import { DropDownButton } from '../../../../components/common/DropDownButton'
import { SearchBar } from '../../../../components/common/SearchBar'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { roleDisplayTitle } from '../../../../helpers/formatters'
import {
  MembersQuery,
  namedOperations,
  Role,
  useInviteAthleteMutation,
  useInviteCoachMutation,
  useMembersQuery,
} from '../../../../types/graphql'

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
      const { email, emailConfirmed } = params.value

      return (
        <>
          <Tooltip title={emailConfirmed ? 'E-mail is confirmed' : 'E-mail is not confirmed'}>
            <VerifiedIcon color={emailConfirmed ? 'primary' : 'disabled'} sx={{ mr: 0.5 }} />
          </Tooltip>
          {email}
        </>
      )
    },
  },
  {
    width: 200,
    field: 'roles',
    sortable: false,
    headerName: 'Roles',
    valueGetter(params) {
      return params.row.teamRoles.map((e) => e.role)
    },
    renderCell(params) {
      return params.value.map((role: Role) => <Chip key={role} label={roleDisplayTitle(role)} sx={{ mr: 0.5 }} />)
    },
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
      actions={
        <>
          <DropDownButton startIcon={<AddIcon />} title="Invite">
            <MenuItem
              onClick={async () => {
                const email = prompt('E-mail')

                if (email) {
                  await inviteCoach({ variables: { email } })
                }
              }}
            >
              Invite Coach
            </MenuItem>
            <MenuItem
              onClick={async () => {
                const email = prompt('E-mail')

                if (email) {
                  await inviteAthlete({ variables: { email } })
                }
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
