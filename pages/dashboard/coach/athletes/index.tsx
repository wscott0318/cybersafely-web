import AddIcon from '@mui/icons-material/AddOutlined'
import { Button, Stack } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { AvatarWithName } from '../../../../components/common/AvatarWithName'
import { DataGridActions, DataGridViewer, InferNodeType } from '../../../../components/common/DataGridViewer'
import { PlatformChip } from '../../../../components/common/PlatformChip'
import { SearchBar } from '../../../../components/common/SearchBar'
import { UserScore } from '../../../../components/common/UserScore'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { InviteAthleteForm } from '../../../../components/forms/InviteAthleteForm'
import { UsersQuery, namedOperations, useCreateUserRoleMutation, useUsersQuery } from '../../../../schema'
import { useAlert } from '../../../../utils/context/alert'
import { useSchoolRole } from '../../../../utils/context/auth'

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
    width: 350,
    field: 'platforms',
    headerName: 'Platforms',
    renderCell(params) {
      return (
        <Stack direction="row" spacing={0.5}>
          {params.row.platforms.map((platform) => (
            <PlatformChip key={platform} platform={platform} />
          ))}
        </Stack>
      )
    },
  },
  {
    width: 200,
    field: 'parentalApproval',
    headerName: 'Parental Approval',
    valueFormatter(params) {
      if (typeof params.value === 'boolean') {
        return params.value ? 'Yes' : 'No'
      }
      return 'Pending'
    },
  },
  {
    width: 150,
    field: 'posts',
    headerName: 'Posts',
    valueGetter() {
      return 100
    },
  },
  {
    width: 200,
    field: 'score',
    headerName: 'Score',
    renderCell() {
      return <UserScore />
    },
  },
]

function Athletes() {
  const { pushAlert } = useAlert()
  const schoolRole = useSchoolRole()

  const query = useUsersQuery({
    variables: {
      filter: {
        from: 'SCHOOL',
        roles: ['ATHLETE'],
        fromId: schoolRole!.school.id,
      },
    },
  })

  const [createUserRole] = useCreateUserRoleMutation({
    refetchQueries: [namedOperations.Query.users],
  })

  return (
    <DataGridViewer
      query={query}
      title="Athletes"
      columns={columns}
      data={query.data?.users}
      initialSortModel={{ field: 'createdAt', sort: 'desc' }}
      href={(e) => ({ pathname: '/dashboard/coach/members/[memberId]', query: { memberId: e.id } })}
      actions={
        <DataGridActions>
          <Button
            fullWidth
            startIcon={<AddIcon />}
            onClick={() => {
              pushAlert({
                type: 'custom',
                title: 'Invite Athlete',
                content: InviteAthleteForm,
                props: { schoolId: schoolRole!.school.id },
                result: async ({ email, parentEmail }) => {
                  const { data } = await createUserRole({
                    variables: {
                      input: {
                        email,
                        type: 'ATHLETE',
                        relationId: schoolRole!.school.id,
                      },
                    },
                  })
                  await createUserRole({
                    variables: {
                      input: {
                        email: parentEmail,
                        type: 'PARENT',
                        relationId: data!.createUserRole.id,
                      },
                    },
                  })
                },
              })
            }}
          >
            Invite Athlete
          </Button>
          <SearchBar onSearch={(search) => query.refetch({ filter: { ...query.variables?.filter, search } })} />
        </DataGridActions>
      }
    />
  )
}

export default withDashboardLayout(Athletes, {
  title: 'Athletes',
})
