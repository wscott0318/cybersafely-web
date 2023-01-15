import AddIcon from '@mui/icons-material/AddOutlined'
import { Chip, MenuItem } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { GetServerSideProps } from 'next'
import { DataGridViewer, InferNodeType } from '../../../../../components/common/DataGridViewer'
import { DropDownButton } from '../../../../../components/common/DropDownButton'
import { SearchBar } from '../../../../../components/common/SearchBar'
import { UserEmail } from '../../../../../components/common/UserEmail'
import { withDashboardLayout } from '../../../../../components/dashboard/Layout'
import { roleDisplayTitle } from '../../../../../helpers/formatters'
import {
  MembersQuery,
  namedOperations,
  useInviteAthleteMutation,
  useInviteCoachMutation,
  useMembersQuery,
  useTeamQuery,
} from '../../../../../types/graphql'

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

type Props = {
  teamId: string
}

function Team({ teamId }: Props) {
  const { data } = useTeamQuery({
    variables: { id: teamId },
  })
  const query = useMembersQuery({
    context: { teamId },
  })

  const [inviteCoach] = useInviteCoachMutation({
    context: { teamId },
    refetchQueries: [namedOperations.Query.members],
  })
  const [inviteAthlete] = useInviteAthleteMutation({
    context: { teamId },
    refetchQueries: [namedOperations.Query.members],
  })

  return (
    <DataGridViewer
      query={query}
      columns={columns}
      data={query.data?.members}
      back="/dashboard/staff/teams"
      title={data ? `Members of "${data.team.name}"` : 'Members'}
      href={(e) => `/dashboard/staff/teams/${teamId}/members/${e.id}`}
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

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const teamId = ctx.params!.teamId as string
  return { props: { teamId } }
}

export default withDashboardLayout(Team, {
  title: 'Members',
})
