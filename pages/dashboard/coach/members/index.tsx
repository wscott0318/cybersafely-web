import AddIcon from '@mui/icons-material/AddOutlined'
import { MenuItem } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { DataGridViewer, InferNodeType } from '../../../../components/common/DataGridViewer'
import { DropDownButton } from '../../../../components/common/DropDownButton'
import { SearchBar } from '../../../../components/common/SearchBar'
import { UserEmail } from '../../../../components/common/UserEmail'
import { UserRoles } from '../../../../components/common/UserRoles'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { MemberActions } from '../../../../components/data/MemberActions'
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
      actions={[
        <DropDownButton startIcon={<AddIcon />} title="Invite" fullWidth>
          <MenuItem
            onClick={async () => {
              pushAlert({
                type: 'result',
                title: 'Invite Coach',
                message: 'Enter an e-mail below',
                label: 'E-mail',
                resultType: 'email',
                result: (email) => {
                  inviteCoach({ variables: { email } })
                },
              })
            }}
          >
            Invite Coach
          </MenuItem>
          <MenuItem
            onClick={async () => {
              pushAlert({
                type: 'result',
                title: 'Invite Athlete',
                message: 'Enter an e-mail below',
                label: 'E-mail',
                resultType: 'email',
                result: (email) => {
                  inviteAthlete({ variables: { email } })
                },
              })
            }}
          >
            Invite Athlete
          </MenuItem>
        </DropDownButton>,
        <SearchBar onSearch={(search) => query.refetch({ search })} />,
      ]}
    />
  )
}

export default withDashboardLayout(Members, {
  title: 'Members',
})
