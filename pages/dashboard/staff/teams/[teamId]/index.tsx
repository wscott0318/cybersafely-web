import AddIcon from '@mui/icons-material/AddOutlined'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Button, CircularProgress, Container, Stack, Tab } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { GetServerSideProps } from 'next'
import { useMemo, useState } from 'react'
import { DataGridActions, DataGridViewer, InferNodeType } from '../../../../../components/common/DataGridViewer'
import { NavigationActions, NavigationView } from '../../../../../components/common/NavigationView'
import { SearchBar } from '../../../../../components/common/SearchBar'
import { UserEmail } from '../../../../../components/common/UserEmail'
import { UserRoles } from '../../../../../components/common/UserRoles'
import { withDashboardLayout } from '../../../../../components/dashboard/Layout'
import { MemberActions } from '../../../../../components/data/MemberActions'
import { InviteMemberForm } from '../../../../../components/form/InviteMemberForm'
import { UpdateTeamForm } from '../../../../../components/form/UpdateTeamForm'
import {
  MembersQuery,
  namedOperations,
  useInviteMemberMutation,
  useMembersQuery,
  useTeamQuery,
} from '../../../../../types/graphql'
import { useAlert } from '../../../../../utils/context/alert'

type Props = {
  teamId: string
}

const getColumns: (teamId: string) => GridColumns<InferNodeType<MembersQuery['members']>> = (teamId) => [
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
      return <MemberActions memberId={params.row.id} teamId={teamId} />
    },
  },
]

function TeamMembers({ teamId }: Props) {
  const { pushAlert } = useAlert()

  const query = useMembersQuery({
    context: { teamId },
  })

  const [inviteMember] = useInviteMemberMutation({
    context: { teamId },
    refetchQueries: [namedOperations.Query.members],
  })

  const columns = useMemo(() => getColumns(teamId), [teamId])

  return (
    <DataGridViewer
      query={query}
      title="Members"
      columns={columns}
      data={query.data?.members}
      initialSortModel={{ field: 'createdAt', sort: 'desc' }}
      href={(e) => `/dashboard/staff/teams/${teamId}/members/${e.id}`}
      actions={
        <DataGridActions>
          <Button
            fullWidth
            startIcon={<AddIcon />}
            onClick={() => {
              pushAlert({
                type: 'custom',
                title: 'Invite Member',
                message: 'Enter the information below',
                content: InviteMemberForm,
                result: (variables) => {
                  inviteMember({ variables })
                },
              })
            }}
          >
            Invite Member
          </Button>
          <SearchBar onSearch={(search) => query.refetch({ search })} />
        </DataGridActions>
      }
    />
  )
}

type LoaderProps<T> = {
  data: T | undefined | null
  children: (data: T) => JSX.Element
}

function Loader<T>({ data, children }: LoaderProps<T>) {
  if (!data) {
    return (
      <Stack alignItems="center" p={2}>
        <CircularProgress size={24} />
      </Stack>
    )
  }

  return children(data)
}

function Team(props: Props) {
  const [tab, setTab] = useState('members')

  const { data } = useTeamQuery({
    variables: { id: props.teamId },
  })

  return (
    <TabContext value={tab}>
      <Loader data={data}>
        {({ team }) => (
          <NavigationView
            title={team.name}
            back="/dashboard/staff/teams"
            actions={
              <NavigationActions>
                <TabList onChange={(_, tab) => setTab(tab)}>
                  <Tab label="Members" value="members" />
                  <Tab label="Details" value="details" />
                </TabList>
              </NavigationActions>
            }
          >
            <TabPanel value="members">
              <TeamMembers {...props} />
            </TabPanel>
            <TabPanel value="details">
              <Container disableGutters maxWidth="sm">
                <UpdateTeamForm team={team} />
              </Container>
            </TabPanel>
          </NavigationView>
        )}
      </Loader>
    </TabContext>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const teamId = ctx.params!.teamId as string
  return { props: { teamId } }
}

export default withDashboardLayout(Team, {
  title: 'Team',
})
