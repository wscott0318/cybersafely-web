import AddIcon from '@mui/icons-material/AddOutlined'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Button, Tab } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { GetServerSideProps } from 'next'
import { useMemo, useState } from 'react'
import { AvatarWithName } from '../../../../../../../components/common/AvatarWithName'
import { DataGridActions, DataGridViewer, InferNodeType } from '../../../../../../../components/common/DataGridViewer'
import { NavigationActions, NavigationView } from '../../../../../../../components/common/NavigationView'
import { SearchBar } from '../../../../../../../components/common/SearchBar'
import { UserEmail } from '../../../../../../../components/common/UserEmail'
import { UserRoles } from '../../../../../../../components/common/UserRoles'
import { withDashboardLayout } from '../../../../../../../components/dashboard/Layout'
import { ParentActions } from '../../../../../../../components/data/ParentActions'
import { InviteUserForm } from '../../../../../../../components/forms/InviteUserForm'
import { ApolloClientProvider } from '../../../../../../../libs/apollo'
import {
  namedOperations,
  useCreateUserRoleMutation,
  UsersQuery,
  useUserQuery,
  useUsersQuery,
} from '../../../../../../../schema'
import { useAlert } from '../../../../../../../utils/context/alert'

const getColumns: (userId: string) => GridColumns<InferNodeType<UsersQuery['users']>> = (userId) => [
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
      return params.row.roles.find((e) => e.__typename === 'ParentRole' && e.childUser.id === userId)
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
      const userRole = params.row.roles.find((e) => e.__typename === 'ParentRole' && e.childUser.id === userId)
      return <ParentActions userRoleId={userRole!.id} />
    },
  },
]

type Props = {
  schoolId: string
  userId: string
}

function MemberParents({ userId }: Props) {
  const { pushAlert } = useAlert()

  const query = useUsersQuery({
    variables: { from: 'CHILD', fromId: userId },
  })

  const [createUserRole] = useCreateUserRoleMutation({
    refetchQueries: [namedOperations.Query.users],
  })

  const columns = useMemo(() => getColumns(userId), [userId])

  return (
    <DataGridViewer
      query={query}
      title="Parents"
      columns={columns}
      data={query.data?.users}
      initialSortModel={{ field: 'createdAt', sort: 'desc' }}
      actions={
        <DataGridActions>
          <Button
            fullWidth
            startIcon={<AddIcon />}
            onClick={() => {
              pushAlert({
                type: 'custom',
                title: 'Invite Parent',
                content: InviteUserForm,
                message: 'Enter the information below',
                props: { allow: ['PARENT'] },
                result: ({ email }) => {
                  createUserRole({
                    variables: {
                      input: {
                        email,
                        type: 'PARENT',
                        relationId: userId,
                      },
                    },
                  })
                },
              })
            }}
          >
            Invite Parent
          </Button>
          <SearchBar onSearch={(search) => query.refetch({ search })} />
        </DataGridActions>
      }
    />
  )
}

function MemberWrapper(props: Props) {
  const [tab, setTab] = useState('parents')

  const { data } = useUserQuery({
    variables: { id: props.userId },
  })

  return (
    <TabContext value={tab}>
      <NavigationView
        title={data?.user.name ?? 'Member'}
        back={`/dashboard/staff/schools/${props.schoolId}`}
        actions={
          <NavigationActions>
            <TabList onChange={(_, tab) => setTab(tab)}>
              <Tab label="Parents" value="parents" />
            </TabList>
          </NavigationActions>
        }
      >
        <TabPanel value="parents">
          <MemberParents {...props} />
        </TabPanel>
      </NavigationView>
    </TabContext>
  )
}

function Member(props: Props) {
  return (
    <ApolloClientProvider schoolId={props.schoolId}>
      <MemberWrapper {...props} />
    </ApolloClientProvider>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const schoolId = ctx.params!.schoolId as string
  const userId = ctx.params!.userId as string
  return { props: { schoolId, userId } }
}

export default withDashboardLayout(Member, {
  title: 'Members',
})
