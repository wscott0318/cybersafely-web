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
          <Typography variant="h5">
            Stats{' '}
            <Typography display="inline" color="text.disabled">
              (in the last {DAYS} days)
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CumulativeChartCard
            title="Total Users*"
            data={data?.statsOfCreatedUsers.stats}
            total={data?.statsOfCreatedUsers.total}
            helper="*Users that confirmed their e-mail address"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CumulativeChartCard
            title="Total Teams"
            data={data?.statsOfCreatedTeams.stats}
            total={data?.statsOfCreatedTeams.total}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CumulativeChartCard
            title="Total Members*"
            data={data?.statsOfCreatedMembers.stats}
            total={data?.statsOfCreatedMembers.total}
            helper="*Members with an active member role"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CumulativeChartCard
            title="Total Parents*"
            data={data?.statsOfCreatedParents.stats}
            total={data?.statsOfCreatedParents.total}
            helper="*Parents with an active parent role"
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default withDashboardLayout(Home, {
  title: 'Home',
})
