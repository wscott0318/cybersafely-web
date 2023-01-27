import { Box, Grid, Typography } from '@mui/material'
import 'chartjs-adapter-date-fns'
import { CumulativeChartCard } from '../../../../components/chart/CumulativeChartCard'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { useStatsForStaffQuery } from '../../../../types/graphql'

const DAYS = 15

function Home() {
  const { data } = useStatsForStaffQuery({
    variables: { days: DAYS },
  })

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
            helper={`*from the last ${DAYS} days`}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CumulativeChartCard
            title="Added Parents*"
            data={data?.statsOfCreatedParents}
            helper={`*from the last ${DAYS} days`}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default withDashboardLayout(Home, {
  title: 'Home',
})
