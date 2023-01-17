import AddIcon from '@mui/icons-material/AddOutlined'
import { Button } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { GetServerSideProps } from 'next'
import { useMemo } from 'react'
import { DataGridViewer, InferNodeType } from '../../../../../../../components/common/DataGridViewer'
import { SearchBar } from '../../../../../../../components/common/SearchBar'
import { UserEmail } from '../../../../../../../components/common/UserEmail'
import { withDashboardLayout } from '../../../../../../../components/dashboard/Layout'
import { getParentActions } from '../../../../../../../components/data/ParentActions'
import {
  namedOperations,
  ParentsQuery,
  useInviteParentMutation,
  useMemberQuery,
  useParentsQuery,
} from '../../../../../../../types/graphql'
import { useAlert } from '../../../../../../../utils/context/alert'

const getColumns: (childId: string, teamId: string) => GridColumns<InferNodeType<ParentsQuery['parents']>> = (
  childId,
  teamId
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
      return params.row.parentRole?.relation
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
    width: 100,
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    getActions(params) {
      return getParentActions(params.row.id, childId, teamId)
    },
  },
]

type Props = {
  teamId: string
  memberId: string
}

function Member({ teamId, memberId }: Props) {
  const { pushAlert } = useAlert()

  const { data } = useMemberQuery({
    context: { teamId },
    variables: { id: memberId },
  })
  const query = useParentsQuery({
    context: { teamId },
    variables: { childId: memberId },
  })

  const [inviteParent] = useInviteParentMutation({
    context: { teamId },
    refetchQueries: [namedOperations.Query.parents],
  })

  const columns = useMemo(() => getColumns(memberId, teamId), [])

  return (
    <DataGridViewer
      query={query}
      columns={columns}
      data={query.data?.parents}
      back={`/dashboard/staff/teams/${teamId}`}
      initialSortModel={{ field: 'createdAt', sort: 'desc' }}
      title={data ? `Parents of "${data.member.name}"` : 'Parents'}
      actions={
        <>
          <Button
            startIcon={<AddIcon />}
            onClick={async () => {
              pushAlert({
                type: 'result',
                title: 'Invite Parent',
                message: 'Enter an e-mail below',
                label: 'E-mail',
                result: (email) => {
                  inviteParent({ variables: { childId: memberId, email } })
                },
              })
            }}
          >
            Invite Parent
          </Button>
          <SearchBar onSearch={(search) => query.refetch({ search })} />
        </>
      }
    />
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const teamId = ctx.params!.teamId as string
  const memberId = ctx.params!.memberId as string
  return { props: { teamId, memberId } }
}

export default withDashboardLayout(Member, {
  title: 'Members',
})
