import { Box, Grid, Stack, Switch } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { useMemo } from 'react'
import { DataGridActions, DataGridViewer, InferNodeType } from '../../../../components/common/DataGridViewer'
import { PlatformChip } from '../../../../components/common/PlatformChip'
import { SearchBar } from '../../../../components/common/SearchBar'
import { UserScore } from '../../../../components/common/UserScore'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { DashboardIntroText } from '../../../../components/shared/DashboardIntroText'
import {
  SchoolRole,
  UpdateUserParentalApprovalMutationHookResult,
  UsersQuery,
  namedOperations,
  useUpdateUserParentalApprovalMutation,
  useUsersQuery,
} from '../../../../schema'
import { useUser } from '../../../../utils/context/auth'

const getColumns: (props: {
  mutation: UpdateUserParentalApprovalMutationHookResult
}) => GridColumns<InferNodeType<UsersQuery['users']>> = ({ mutation }) => [
  {
    width: 250,
    field: 'name',
    headerName: 'Name',
  },
  {
    width: 300,
    field: 'email',
    headerName: 'E-mail',
  },
  {
    width: 250,
    field: 'school',
    headerName: 'School',
    valueGetter(params) {
      const roles = params.row.roles.filter((e) => e.type === 'STUDENT') as SchoolRole[]
      return roles.map((e) => e.school.name)
    },
    valueFormatter(params) {
      return params.value.join(', ')
    },
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
    field: 'score',
    headerName: 'Score',
    renderCell() {
      return <UserScore />
    },
  },
  {
    width: 200,
    type: 'actions',
    field: 'parentalApproval',
    headerName: 'Parental Approval',
    renderCell(params) {
      return (
        <Switch
          checked={params.row.parentalApproval ?? false}
          onChange={(_, approve) => {
            mutation[0]({ variables: { id: params.row.id, approve } })
          }}
        />
      )
    },
  },
]

function Home() {
  const { user } = useUser()

  const query = useUsersQuery({
    variables: {
      filter: {
        from: 'PARENT',
        fromId: user.id,
      },
    },
  })

  const mutation = useUpdateUserParentalApprovalMutation({
    refetchQueries: [namedOperations.Query.users],
  })

  const columns = useMemo(() => getColumns({ mutation }), [mutation])

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DashboardIntroText />
        </Grid>
        <Grid item xs={12}>
          <DataGridViewer
            title="Children"
            query={query}
            columns={columns}
            data={query.data?.users}
            href={(e) => ({
              pathname: '/dashboard/parent/child/[id]',
              query: { id: e.id },
            })}
            initialSortModel={{ field: 'createdAt', sort: 'desc' }}
            actions={
              <DataGridActions>
                <SearchBar onSearch={(search) => query.refetch({ filter: { ...query.variables?.filter, search } })} />
              </DataGridActions>
            }
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default withDashboardLayout(Home, {
  title: 'Home',
})
