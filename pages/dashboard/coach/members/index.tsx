import AddIcon from '@mui/icons-material/AddOutlined'
import { Button } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { AvatarWithName } from '../../../../components/common/AvatarWithName'
import { DataGridActions, DataGridViewer, InferNodeType } from '../../../../components/common/DataGridViewer'
import { SearchBar } from '../../../../components/common/SearchBar'
import { UserEmail } from '../../../../components/common/UserEmail'
import { UserRoles } from '../../../../components/common/UserRoles'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { InviteMemberForm } from '../../../../components/form/InviteMemberForm'
import { MembersQuery, namedOperations, useInviteMemberMutation, useMembersQuery } from '../../../../types/graphql'
import { useAlert } from '../../../../utils/context/alert'

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
]

function Members() {
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
      href={(e) => `/dashboard/coach/members/${e.id}`}
      initialSortModel={{ field: 'createdAt', sort: 'desc' }}
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

export default withDashboardLayout(Members, {
  title: 'Members',
})
