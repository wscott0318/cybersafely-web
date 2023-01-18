import AddIcon from '@mui/icons-material/AddOutlined'
import { Button } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { GetServerSideProps } from 'next'
import { useMemo } from 'react'
import { DataGridViewer, InferNodeType } from '../../../../../components/common/DataGridViewer'
import { SearchBar } from '../../../../../components/common/SearchBar'
import { UserEmail } from '../../../../../components/common/UserEmail'
import { withDashboardLayout } from '../../../../../components/dashboard/Layout'
import { getParentActions } from '../../../../../components/data/ParentActions'
import { InviteParentForm } from '../../../../../components/form/InviteParentForm'
import {
  namedOperations,
  ParentsQuery,
  useInviteParentMutation,
  useMemberQuery,
  useParentsQuery,
} from '../../../../../types/graphql'
import { useAlert } from '../../../../../utils/context/alert'

const getColumns: (childId: string) => GridColumns<InferNodeType<ParentsQuery['parents']>> = (childId) => [
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
      return getParentActions(params.row.id, childId)
    },
  },
]

type Props = {
  memberId: string
}

function Member({ memberId }: Props) {
  const { pushAlert } = useAlert()

  const { data } = useMemberQuery({
    variables: { id: memberId },
  })
  const query = useParentsQuery({
    variables: { childId: memberId },
  })

  const [inviteParent] = useInviteParentMutation({
    refetchQueries: [namedOperations.Query.parents],
  })

  const columns = useMemo(() => getColumns(memberId), [])

  return (
    <DataGridViewer
      query={query}
      columns={columns}
      data={query.data?.parents}
      back="/dashboard/coach/members"
      initialSortModel={{ field: 'createdAt', sort: 'desc' }}
      title={data ? `Parents of "${data.member.name}"` : 'Parents'}
      actions={
        <>
          <Button
            startIcon={<AddIcon />}
            onClick={async () => {
              pushAlert({
                type: 'custom',
                title: 'Invite Parent',
                content: InviteParentForm,
                message: 'Enter the information below',
                result: ({ email, relation }) => {
                  inviteParent({ variables: { childId: memberId, email, relation } })
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
  const memberId = ctx.params!.memberId as string
  return { props: { memberId } }
}

export default withDashboardLayout(Member, {
  title: 'Member',
})
