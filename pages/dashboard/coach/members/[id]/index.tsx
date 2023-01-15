import AddIcon from '@mui/icons-material/AddOutlined'
import VerifiedIcon from '@mui/icons-material/Verified'
import { Button, Tooltip } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { GetServerSideProps } from 'next'
import { DataGridViewer, InferNodeType } from '../../../../../components/common/DataGridViewer'
import { SearchBar } from '../../../../../components/common/SearchBar'
import { withDashboardLayout } from '../../../../../components/dashboard/Layout'
import {
  namedOperations,
  ParentsQuery,
  useInviteParentMutation,
  useMemberQuery,
  useParentsQuery,
} from '../../../../../types/graphql'

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
}

function Member({ id }: Props) {
  const { data } = useMemberQuery({
    variables: { id },
  })
  const query = useParentsQuery({
    variables: { childId: id },
  })

  const [inviteParent] = useInviteParentMutation({
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
                await inviteParent({ variables: { childId: id, email } })
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
  return { props: { id } }
}

export default withDashboardLayout(Member, {
  title: 'Member',
})
