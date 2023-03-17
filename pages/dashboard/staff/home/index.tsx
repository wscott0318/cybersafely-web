import CalendarIcon from '@mui/icons-material/CalendarMonthOutlined'
import { Box, Grid, InputAdornment, MenuItem, Select, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { CumulativeChartCard } from '../../../../components/chart/CumulativeChartCard'
import { InfoCard } from '../../../../components/common/InfoCard'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { usePostCardsQuery, useStatsForStaffQuery } from '../../../../schema'

function Home() {
  const [days, setDays] = useState(14)

  const { data: cardsData } = usePostCardsQuery()

  const { data } = useStatsForStaffQuery({
    variables: { days },
  })

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" flexGrow={1}>
            Cards
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard
            severity="info"
            title="Total Posts"
            href="/dashboard/staff/posts"
            message={cardsData?.totalPosts.page.total ?? 0}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard
            severity="error"
            title="Concerning Posts"
            href="/dashboard/staff/posts?flagged=true"
            message={cardsData?.flaggedPosts.page.total ?? 0}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center">
            <Typography variant="h5" flexGrow={1}>
              Stats
            </Typography>
            <Select
              value={days}
              variant="outlined"
              onChange={(e) => setDays(e.target.value as number)}
              startAdornment={
                <InputAdornment position="start">
                  <CalendarIcon />
                </InputAdornment>
              }
            >
              <MenuItem value={7}>Last week</MenuItem>
              <MenuItem value={14}>Last 2 weeks</MenuItem>
              <MenuItem value={30}>Last month</MenuItem>
              <MenuItem value={60}>Last 2 months</MenuItem>
            </Select>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CumulativeChartCard
            fillHeight
            title="Total Users*"
            data={data?.statsOfCreatedUsers.stats}
            total={data?.statsOfCreatedUsers.total}
            helper="*Users that confirmed their e-mail address"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CumulativeChartCard
            fillHeight
            title="Total Schools"
            data={data?.statsOfCreatedSchools.stats}
            total={data?.statsOfCreatedSchools.total}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CumulativeChartCard
            fillHeight
            title="Total Members*"
            data={data?.statsOfCreatedMembers.stats}
            total={data?.statsOfCreatedMembers.total}
            helper="*Members with an active member role"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CumulativeChartCard
            fillHeight
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
  maxWidth: 'lg',
})
