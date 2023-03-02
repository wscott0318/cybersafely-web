import AddIcon from '@mui/icons-material/AddOutlined'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Button, CircularProgress, Container, Stack, Tab } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { GetServerSideProps } from 'next'
import { useMemo, useState } from 'react'
import { AvatarWithName } from '../../../../../components/common/AvatarWithName'
import { DataGridActions, DataGridViewer, InferNodeType } from '../../../../../components/common/DataGridViewer'
import { DropDownButton } from '../../../../../components/common/DropDownButton'
import { EmptyFileAnimation } from '../../../../../components/common/EmptyFileAnimation'
import { NavigationActions, NavigationView } from '../../../../../components/common/NavigationView'
import { RemoveUserRoleMenuItem } from '../../../../../components/common/RemoveUserRoleMenuItem'
import { SearchBar } from '../../../../../components/common/SearchBar'
import { UserEmail } from '../../../../../components/common/UserEmail'
import { UserRoles } from '../../../../../components/common/UserRoles'
import { withDashboardLayout } from '../../../../../components/dashboard/Layout'
import { InviteUserForm } from '../../../../../components/forms/InviteUserForm'
import { UpdateSchoolForm } from '../../../../../components/forms/UpdateSchoolForm'
import { ApolloClientProvider } from '../../../../../libs/apollo'
import {
  namedOperations,
  useCreateUserRoleMutation,
  UsersQuery,
  useSchoolQuery,
  useUsersQuery,
} from '../../../../../schema'
import { useAlert } from '../../../../../utils/context/alert'

type Props = {
  schoolId: string
}

const getColumns: (schoolId: string) => GridColumns<InferNodeType<UsersQuery['users']>> = (schoolId) => [
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
    field: 'role',
    sortable: false,
    headerName: 'Role',
    valueGetter(params) {
      return params.row.roles.find((e) => e.__typename === 'SchoolRole' && e.school.id === schoolId)
    },
    renderCell(params) {
      return <UserRoles roles={[params.value]} />
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
  {
    width: 200,
    field: 'actions',
    type: 'actions',
    renderCell(params) {
      const userRole = params.row.roles.find((e) => e.__typename === 'SchoolRole' && e.school.id === schoolId)
      return (
        <DropDownButton>
          <RemoveUserRoleMenuItem title="Remove Member" userRoleId={userRole!.id} />
        </DropDownButton>
      )
    },
  },
]

function SchoolMembers({ schoolId }: Props) {
  const { pushAlert } = useAlert()

  const query = useUsersQuery({
    variables: { from: 'SCHOOL', fromId: schoolId },
  })

  const [createUserRole] = useCreateUserRoleMutation({
    refetchQueries: [namedOperations.Query.users],
  })

  const columns = useMemo(() => getColumns(schoolId), [schoolId])

  return (
    <DataGridViewer
      query={query}
      title="Members"
      columns={columns}
      data={query.data?.users}
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
                content: InviteUserForm,
                result: ({ email, type }) => {
                  createUserRole({ variables: { input: { email, type, relationId: schoolId } } })
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

function SchoolWrapper(props: Props) {
  const [tab, setTab] = useState('members')

  const { data } = useSchoolQuery({
    variables: { id: props.schoolId },
  })

  return (
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
                <UpdateSchoolForm schoolId={school.id} />
              </Container>
            </TabPanel>
            <TabPanel value="posts">
              <EmptyFileAnimation />
            </TabPanel>
          </NavigationView>
        )}
      </Loader>
    </TabContext>
  )
}

function School(props: Props) {
  return (
    <ApolloClientProvider schoolId={props.schoolId}>
      <SchoolWrapper {...props} />
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
