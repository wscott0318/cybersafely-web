import { Box, Chip, CircularProgress, Grid, Paper, Stack, Typography } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'
import { sub } from 'date-fns'
import { CumulativeChartCard } from '../../../../components/chart/CumulativeChartCard'
import { AvatarWithName } from '../../../../components/common/AvatarWithName'
import { DataGridActions, DataGridViewer, InferNodeType } from '../../../../components/common/DataGridViewer'
import { SearchBar } from '../../../../components/common/SearchBar'
import { UserScore } from '../../../../components/common/UserScore'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { TempPaginatedItemQuery, useTempPaginatedItemQuery } from '../../../../types/graphql'

const columns: GridColumns<InferNodeType<TempPaginatedItemQuery['tempPaginatedItem']>> = [
  {
    width: 250,
    field: 'athlete',
    headerName: 'Athlete',
    renderCell() {
      return <AvatarWithName name="Some Athlete" email="athlete@wonderkiln.com" />
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
      return (
        <Chip
          label="TikTok"
          color="default"
          icon={<img alt="TikTok" src="/images/logos/tiktok.svg" height={14} style={{ marginLeft: 6 }} />}
        />
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
]

function generateRandDays(days: number = 14) {
  return Array(days)
    .fill(0)
    .map((_, index) => ({
      day: sub(new Date(), { days: index }),
      value: 10,
    }))
    .reverse()
}

function Posts() {
  const query = useTempPaginatedItemQuery()

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" flexGrow={1}>
            Cards
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Stack direction="row" alignItems="center" height="100%">
              <CircularProgress color="success" size={48} variant="determinate" value={100} />
              <Box>
                <Typography variant="h6">Score</Typography>
                <Typography color="success.main">Good (100%)</Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CumulativeChartCard fillHeight title="Posts" data={generateRandDays()} total={1000} />
        </Grid>
        <Grid item xs={12}>
          <DataGridViewer
            query={query}
            title="Posts"
            columns={columns}
            data={query.data?.tempPaginatedItem}
            href={(e) => `/dashboard/coach/posts/${e.id}`}
            actions={
              <DataGridActions>
                <SearchBar onSearch={() => {}} />
              </DataGridActions>
            }
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default withDashboardLayout(Posts, {
  title: 'Posts',
})
