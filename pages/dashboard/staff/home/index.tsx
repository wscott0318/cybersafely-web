import { Box, Grid, Typography } from '@mui/material'
import 'chartjs-adapter-date-fns'
import { CumulativeChartCard } from '../../../../components/chart/CumulativeChartCard'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { useStatsForStaffQuery } from '../../../../types/graphql'

function Home() {
  const { data } = useStatsForStaffQuery()

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Stats</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CumulativeChartCard title="Total Users" data={data?.statsOfCreatedUsers} total={data?.users.page.total} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CumulativeChartCard title="Total Teams" data={data?.statsOfCreatedTeams} total={data?.teams.page.total} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CumulativeChartCard
            title="Added Members*"
            data={data?.statsOfCreatedMembers}
            helper="*Calculated based on data from the last 15 days"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CumulativeChartCard
            title="Added Parents*"
            data={data?.statsOfCreatedParents}
            helper="*Calculated based on data from the last 15 days"
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default withDashboardLayout(Home, {
  title: 'Home',
})
