import AddIcon from '@mui/icons-material/AddOutlined'
import { Button } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { GetServerSideProps } from 'next'
import { useMemo } from 'react'
import { AvatarWithName } from '../../../../../components/common/AvatarWithName'
import { DataGridActions, DataGridViewer, InferNodeType } from '../../../../../components/common/DataGridViewer'
import { DropDownButton } from '../../../../../components/common/DropDownButton'
import { RemoveUserRoleMenuItem } from '../../../../../components/common/RemoveUserRoleMenuItem'
import { SearchBar } from '../../../../../components/common/SearchBar'
import { withDashboardLayout } from '../../../../../components/dashboard/Layout'
import { InviteUserForm } from '../../../../../components/forms/InviteUserForm'
import {
  UsersQuery,
  namedOperations,
  useCreateUserRoleMutation,
  useUserQuery,
  useUsersQuery,
} from '../../../../../schema'
import { useAlert } from '../../../../../utils/context/alert'

const getColumns: (childId: string) => GridColumns<InferNodeType<UsersQuery['users']>> = (childId) => [
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
      const userRole = params.row.roles.find((e) => e.type === 'PARENT')
      return (
        <DropDownButton>
          <RemoveUserRoleMenuItem title="Remove Parent" userRoleId={userRole!.id} />
        </DropDownButton>
      )
    },
  },
]

type Props = {
  memberId: string
}

function Member({ memberId }: Props) {
  const { pushAlert } = useAlert()

  const { data } = useUserQuery({
    variables: { id: memberId },
  })
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
      columns={columns}
      data={query.data?.users}
      back="/dashboard/coach/members"
      initialSortModel={{ field: 'createdAt', sort: 'desc' }}
      title={data ? `Parents of "${data.user.name}"` : 'Parents'}
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

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const memberId = ctx.params!.memberId as string
  return { props: { memberId } }
}

export default withDashboardLayout(Member, {
  title: 'Member',
})
