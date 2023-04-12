import AddIcon from '@mui/icons-material/AddOutlined'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Button, Tab } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { GetServerSideProps } from 'next'
import { useMemo, useState } from 'react'
import { AvatarWithName } from '../../../../../../../components/common/AvatarWithName'
import { DataGridActions, DataGridViewer, InferNodeType } from '../../../../../../../components/common/DataGridViewer'
import { DropDownButton } from '../../../../../../../components/common/DropDownButton'
import { NavigationActions, NavigationView } from '../../../../../../../components/common/NavigationView'
import { RemoveUserRoleMenuItem } from '../../../../../../../components/common/RemoveUserRoleMenuItem'
import { SearchBar } from '../../../../../../../components/common/SearchBar'
import { UserRoles } from '../../../../../../../components/common/UserRoles'
import { withDashboardLayout } from '../../../../../../../components/dashboard/Layout'
import { InviteUserForm } from '../../../../../../../components/forms/InviteUserForm'
import {
  UsersQuery,
  namedOperations,
  useCreateUserRoleMutation,
  useUserQuery,
  useUsersQuery,
} from '../../../../../../../schema'
import { useAlert } from '../../../../../../../utils/context/alert'

const getColumns: (memberId: string) => GridColumns<InferNodeType<UsersQuery['users']>> = (memberId) => [
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
    width: 200,
    field: 'role',
    sortable: false,
    headerName: 'Role',
    valueGetter(params) {
      return params.row.roles.find((e) => e.__typename === 'ParentRole' && e.childUser.id === memberId)
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
      const userRole = params.row.roles.find((e) => e.__typename === 'ParentRole' && e.childUser.id === memberId)
      return (
        <DropDownButton>
          <RemoveUserRoleMenuItem title="Remove Parent" userRoleId={userRole!.id} />
        </DropDownButton>
      )
    },
  },
]

type Props = {
  schoolId: string
  memberId: string
}

function MemberParents({ memberId }: Props) {
  const { pushAlert } = useAlert()

  const query = useUsersQuery({
    variables: {
      filter: {
        from: 'CHILD',
        fromId: memberId,
      },
    },
  })

  const [createUserRole] = useCreateUserRoleMutation({
    refetchQueries: [namedOperations.Query.users],
  })

  const columns = useMemo(() => getColumns(memberId), [memberId])

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
                props: { allow: ['PARENT'] },
                result: ({ email }) => {
                  createUserRole({
                    variables: {
                      input: {
                        email,
                        type: 'PARENT',
                        relationId: memberId,
                      },
                    },
                  })
                },
              })
            }}
          >
            Invite Parent
          </Button>
          <SearchBar onSearch={(search) => query.refetch({ filter: { ...query.variables?.filter, search } })} />
        </DataGridActions>
      }
    />
  )
}

function Members(props: Props) {
  const [tab, setTab] = useState('parents')

  const { data } = useUserQuery({
    variables: { id: props.memberId },
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

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const schoolId = ctx.params!.schoolId as string
  const memberId = ctx.params!.memberId as string
  return { props: { schoolId, memberId } }
}

export default withDashboardLayout(Members, {
  title: 'Members',
})
