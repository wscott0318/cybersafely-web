import CalendarIcon from '@mui/icons-material/CalendarMonthOutlined'
import { Box, Grid, InputAdornment, MenuItem, Select, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { useStatsForCoachQuery } from '../../types/graphql'
import { CumulativeChartCard } from '../chart/CumulativeChartCard'

export function HomeStatsForCoach() {
  const [days, setDays] = useState(14)

  const { data } = useStatsForCoachQuery({
    variables: { days },
  })

  return (
    <Box>
      <Grid container spacing={2}>
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
            title="Created Members"
            data={data?.statsOfCreatedMembersInSchool.stats}
            total={data?.statsOfCreatedMembersInSchool.total}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CumulativeChartCard
            fillHeight
            title="Pending Members"
            data={data?.statsOfInvitedMembersInSchool.stats}
            total={data?.statsOfInvitedMembersInSchool.total}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CumulativeChartCard
            fillHeight
            title="Accepted Members"
            data={data?.statsOfAcceptedMembersInSchool.stats}
            total={data?.statsOfAcceptedMembersInSchool.total}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CumulativeChartCard fillHeight title="Created Posts" data={[]} total={0} />
        </Grid>
      </Grid>
    </Box>
  )
}
