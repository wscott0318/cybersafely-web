import AddIcon from '@mui/icons-material/AddOutlined'
import { Button } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { UsersQuery, namedOperations, useCreateUserRoleMutation, useUsersQuery } from '../../schema'
import { useAlert } from '../../utils/context/alert'
import { AvatarWithName } from '../common/AvatarWithName'
import { DataGridActions, DataGridViewer, InferNodeType } from '../common/DataGridViewer'
import { DropDownButton } from '../common/DropDownButton'
import { RemoveUserRoleMenuItem } from '../common/RemoveUserRoleMenuItem'
import { SearchBar } from '../common/SearchBar'
import { InviteUserForm } from '../forms/InviteUserForm'

const columns: GridColumns<InferNodeType<UsersQuery['users']>> = [
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

type StudentParentsTableProps = {
  userId: string
}

export function StudentParentsTable({ userId }: StudentParentsTableProps) {
  const { pushAlert } = useAlert()

  const query = useUsersQuery({
    variables: {
      filter: {
        from: 'CHILD',
        fromId: userId,
      },
    },
  })

  const [createUserRole] = useCreateUserRoleMutation({
    refetchQueries: [namedOperations.Query.users],
  })

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
          <SearchBar onSearch={(search) => query.refetch({ filter: { ...query.variables?.filter, search } })} />
        </DataGridActions>
      }
    />
  )
}
