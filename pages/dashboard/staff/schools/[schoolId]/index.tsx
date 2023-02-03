import AddIcon from '@mui/icons-material/AddOutlined'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Button, CircularProgress, Container, Stack, Tab } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { AvatarWithName } from '../../../../../components/common/AvatarWithName'
import { DataGridActions, DataGridViewer, InferNodeType } from '../../../../../components/common/DataGridViewer'
import { EmptyFileAnimation } from '../../../../../components/common/EmptyFileAnimation'
import { NavigationActions, NavigationView } from '../../../../../components/common/NavigationView'
import { SearchBar } from '../../../../../components/common/SearchBar'
import { UserEmail } from '../../../../../components/common/UserEmail'
import { UserRoles } from '../../../../../components/common/UserRoles'
import { withDashboardLayout } from '../../../../../components/dashboard/Layout'
import { MemberActions } from '../../../../../components/data/MemberActions'
import { InviteMemberForm } from '../../../../../components/form/InviteMemberForm'
import { UpdateSchoolForm } from '../../../../../components/form/UpdateSchoolForm'
import { ApolloClientProvider } from '../../../../../libs/apollo'
import {
  MembersQuery,
  namedOperations,
  useInviteMemberMutation,
  useMembersQuery,
  useSchoolQuery,
} from '../../../../../types/graphql'
import { useAlert } from '../../../../../utils/context/alert'

type Props = {
  schoolId: string
}

const columns: GridColumns<InferNodeType<MembersQuery['members']>> = [
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

function SchoolMembers({ schoolId }: Props) {
  const { pushAlert } = useAlert()

  const query = useMembersQuery()

  const [inviteMember] = useInviteMemberMutation({
    refetchQueries: [namedOperations.Query.members],
  })

  return (
    <DataGridViewer
      query={query}
      title="Members"
      columns={columns}
      data={query.data?.members}
      initialSortModel={{ field: 'createdAt', sort: 'desc' }}
      href={(e) => `/dashboard/staff/schools/${schoolId}/members/${e.id}`}
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

function School(props: Props) {
  const [tab, setTab] = useState('members')

  const { data } = useSchoolQuery({
    variables: { id: props.schoolId },
  })

  return (
    <ApolloClientProvider schoolId={props.schoolId}>
      <TabContext value={tab}>
        <Loader data={data}>
          {({ school }) => (
            <NavigationView
              title={school.name}
              back="/dashboard/staff/schools"
              actions={
                <NavigationActions>
                  <TabList onChange={(_, tab) => setTab(tab)}>
                    <Tab label="Members" value="members" />
                    <Tab label="Details" value="details" />
                    <Tab label="Posts" value="posts" />
                  </TabList>
                </NavigationActions>
              }
            >
              <TabPanel value="members">
                <SchoolMembers {...props} />
              </TabPanel>
              <TabPanel value="details">
                <Container disableGutters maxWidth="sm">
                  <UpdateSchoolForm school={school} />
                </Container>
              </TabPanel>
              <TabPanel value="posts">
                <EmptyFileAnimation />
              </TabPanel>
            </NavigationView>
          )}
        </Loader>
      </TabContext>
    </ApolloClientProvider>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const schoolId = ctx.params!.schoolId as string
  return { props: { schoolId } }
}

export default withDashboardLayout(School, {
  title: 'School',
})
