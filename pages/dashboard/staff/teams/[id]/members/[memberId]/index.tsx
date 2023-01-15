import AddIcon from '@mui/icons-material/AddOutlined'
import VerifiedIcon from '@mui/icons-material/Verified'
import { Button, Tooltip } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { GetServerSideProps } from 'next'
import { DataGridViewer, InferNodeType } from '../../../../../../../components/common/DataGridViewer'
import { SearchBar } from '../../../../../../../components/common/SearchBar'
import { withDashboardLayout } from '../../../../../../../components/dashboard/Layout'
import {
  namedOperations,
  ParentsQuery,
  useInviteParentMutation,
  useMemberQuery,
  useParentsQuery,
} from '../../../../../../../types/graphql'

const columns: GridColumns<InferNodeType<ParentsQuery['parents']>> = [
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
      const { email, emailConfirmed } = params.value

      return (
        <>
          <Tooltip title={emailConfirmed ? 'E-mail is confirmed' : 'E-mail is not confirmed'}>
            <VerifiedIcon color={emailConfirmed ? 'primary' : 'disabled'} sx={{ mr: 0.5 }} />
          </Tooltip>
          {email}
        </>
      )
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
]

type Props = {
  id: string
  memberId: string
}

function Member({ id, memberId }: Props) {
  const { data } = useMemberQuery({
    context: { teamId: id },
    variables: { id: memberId },
  })
  const query = useParentsQuery({
    context: { teamId: id },
    variables: { childId: memberId },
  })

  const [inviteParent] = useInviteParentMutation({
    context: { teamId: id },
    refetchQueries: [namedOperations.Query.parents],
  })

  return (
    <DataGridViewer
      query={query}
      columns={columns}
      data={query.data?.parents}
      back="/dashboard/coach/members"
      title={data ? `Parents of "${data.member.name}"` : 'Parents'}
      actions={
        <>
          <Button
            startIcon={<AddIcon />}
            onClick={async () => {
              const email = prompt('E-mail')

              if (email) {
                await inviteParent({ variables: { childId: memberId, email } })
              }
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
  const id = ctx.params!.id as string
  const memberId = ctx.params!.memberId as string
  return { props: { id, memberId } }
}

export default withDashboardLayout(Member, {
  title: 'Members',
})
