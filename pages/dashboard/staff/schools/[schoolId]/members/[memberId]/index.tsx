import AddIcon from '@mui/icons-material/AddOutlined'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Button, Tab } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { GetServerSideProps } from 'next'
import { useMemo, useState } from 'react'
import { DataGridActions, DataGridViewer, InferNodeType } from '../../../../../../../components/common/DataGridViewer'
import { NavigationActions, NavigationView } from '../../../../../../../components/common/NavigationView'
import { SearchBar } from '../../../../../../../components/common/SearchBar'
import { UserEmail } from '../../../../../../../components/common/UserEmail'
import { withDashboardLayout } from '../../../../../../../components/dashboard/Layout'
import { ParentActions } from '../../../../../../../components/data/ParentActions'
import { InviteParentForm } from '../../../../../../../components/form/InviteParentForm'
import {
  namedOperations,
  ParentRole,
  ParentsQuery,
  useInviteParentMutation,
  useMemberQuery,
  useParentsQuery,
} from '../../../../../../../types/graphql'
import { useAlert } from '../../../../../../../utils/context/alert'

const getColumns: (childId: string, schoolId: string) => GridColumns<InferNodeType<ParentsQuery['parents']>> = (
  childId,
  schoolId
) => [
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
    field: 'relation',
    sortable: false,
    headerName: 'Relation',
    valueGetter(params) {
      const role = params.row.roles.find((e) => e.role === 'PARENT') as ParentRole | undefined
      return role?.relation
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
      return <ParentActions parentId={params.row.id} childId={childId} schoolId={schoolId} />
    },
  },
]

type Props = {
  schoolId: string
  memberId: string
}

function MemberParents({ schoolId, memberId }: Props) {
  const { pushAlert } = useAlert()

  const query = useParentsQuery({
    context: { schoolId },
    variables: { childId: memberId },
  })

  const [inviteParent] = useInviteParentMutation({
    context: { schoolId },
    refetchQueries: [namedOperations.Query.parents],
  })

  const columns = useMemo(() => getColumns(memberId, schoolId), [memberId, schoolId])

  return (
    <DataGridViewer
      query={query}
      title="Parents"
      columns={columns}
      data={query.data?.parents}
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
                content: InviteParentForm,
                message: 'Enter the information below',
                result: (variables) => {
                  inviteParent({ variables: { ...variables, childId: memberId } })
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

function Member(props: Props) {
  const [tab, setTab] = useState('parents')

  const { data } = useMemberQuery({
    context: { schoolId: props.schoolId },
    variables: { id: props.memberId },
  })

  return (
    <TabContext value={tab}>
      <NavigationView
        title={data?.member.name ?? 'Member'}
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

export default withDashboardLayout(Member, {
  title: 'Members',
})
