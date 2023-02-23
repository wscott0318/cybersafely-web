import { Box, Chip, CircularProgress, Grid, Paper, Stack, Typography } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { DataGridActions, DataGridViewer, InferNodeType } from '../../../../components/common/DataGridViewer'
import { NextLink } from '../../../../components/common/NextLink'
import { SearchBar } from '../../../../components/common/SearchBar'
import { UserScore } from '../../../../components/common/UserScore'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { TempPaginatedItemQuery, useTempPaginatedItemQuery } from '../../../../types/graphql'

const columns: GridColumns<InferNodeType<TempPaginatedItemQuery['tempPaginatedItem']>> = [
  {
    width: 250,
    field: 'content',
    headerName: 'Content',
    valueGetter() {
      return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
  },
  {
    width: 250,
    field: 'date',
    headerName: 'Date',
    valueFormatter() {
      return new Date().toLocaleString()
    },
  },
  {
    width: 150,
    field: 'platform',
    headerName: 'Platform',
    renderCell() {
      return <Chip color="default" label="TikTok" />
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

function Posts() {
  const query = useTempPaginatedItemQuery()

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" flexGrow={1}>
          Cards
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper sx={{ p: 2 }}>
          <Stack direction="row" alignItems="center">
            <CircularProgress color="success" size={48} variant="determinate" value={100} />
            <Box>
              <Typography variant="h6">Score</Typography>
              <Typography color="success.main">Good (100%)</Typography>
            </Box>
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <NextLink href="/dashboard/profile">
          <Paper sx={{ p: 2, cursor: 'pointer' }}>
            <Stack direction="row" alignItems="center">
              <Box position="relative">
                <CircularProgress
                  size={48}
                  value={100}
                  color="inherit"
                  variant="determinate"
                  sx={{ position: 'absolute', color: 'divider' }}
                />
                <CircularProgress
                  size={48}
                  color="success"
                  variant="determinate"
                  value={(1 / 5) * 100}
                  sx={{ display: 'block' }}
                />
              </Box>
              <Box>
                <Typography variant="h6">Socials</Typography>
                <Typography color="success.main">Connected 1 out of 5 socials</Typography>
              </Box>
            </Stack>
          </Paper>
        </NextLink>
      </Grid>
      <Grid item xs={12}>
        <DataGridViewer
          query={query}
          title="Posts"
          columns={columns}
          data={query.data?.tempPaginatedItem}
          actions={
            <DataGridActions>
              <SearchBar onSearch={() => {}} />
            </DataGridActions>
          }
        />
      </Grid>
    </Grid>
  )
}

export default withDashboardLayout(Posts, {
  title: 'Posts',
})
