import CalendarIcon from '@mui/icons-material/CalendarMonthOutlined'
import { Box, Grid, InputAdornment, MenuItem, Paper, Select, Stack, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import { usePostCardsQuery, useStatsForSchoolQuery } from '../../schema'
import { useSchoolRole } from '../../utils/context/auth'
import { CumulativeChartCard } from '../chart/CumulativeChartCard'
import { InfoCard, InfoCardProps } from '../common/InfoCard'
import { DashboardIntroText } from './DashboardIntroText'

function useMissingCards() {
  const schoolRole = useSchoolRole()

  const cards = useMemo(() => {
    const cards: InfoCardProps[] = []

    if (schoolRole) {
      if (!schoolRole.school.logo) {
        cards.push({ href: '/dashboard/school', message: 'School Logo' })
      }

      if (!schoolRole.school.cover) {
        cards.push({ href: '/dashboard/school', message: 'School Cover' })
      }
    }

    return cards
  }, [schoolRole])

  return {
    cards,
    hasCards: cards.length > 0,
  }
}

export function HomeStatsForAdminAndCoach() {
  const schoolRole = useSchoolRole()
  const { cards } = useMissingCards()

  const [days, setDays] = useState(14)

  const { data: cardsData } = usePostCardsQuery({
    variables: { schoolId: schoolRole!.school.id },
  })

  const { data } = useStatsForSchoolQuery({
    variables: { schoolId: schoolRole!.school.id, days },
  })

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DashboardIntroText />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" flexGrow={1}>
            Highlights
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard
            severity="error"
            title="Critical Posts"
            message={cardsData?.severityHighPosts.page.total ?? 0}
            href={
              schoolRole!.type === 'ADMIN'
                ? { pathname: '/dashboard/admin/posts', query: { severity: 'HIGH' } }
                : { pathname: '/dashboard/coach/posts', query: { severity: 'HIGH' } }
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard
            severity="warning"
            title="Warning Posts"
            message={cardsData?.severityLowPosts.page.total ?? 0}
            href={
              schoolRole!.type === 'ADMIN'
                ? { pathname: '/dashboard/admin/posts', query: { severity: 'LOW' } }
                : { pathname: '/dashboard/coach/posts', query: { severity: 'LOW' } }
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard
            severity="info"
            title="No Issue Posts"
            message={cardsData?.severityNonePosts.page.total ?? 0}
            href={
              schoolRole!.type === 'ADMIN'
                ? { pathname: '/dashboard/admin/posts', query: { severity: 'NONE' } }
                : { pathname: '/dashboard/coach/posts', query: { severity: 'NONE' } }
            }
          />
        </Grid>
        {cards.map((card, index) => (
          <Grid key={String(index)} item xs={12} sm={6} md={4}>
            <InfoCard {...card} />
          </Grid>
        ))}
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
                  <CalendarIcon fontSize="small" />
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
          <Paper sx={{ p: 2, height: '100%' }}>
            <Stack spacing={0} justifyContent="flex-end" height="100%">
              <Typography color="text.disabled" maxWidth={80}>
                Social Networks Connected
              </Typography>
              <Typography variant="h4">{data?.statsOfSocialsConnected ?? 0}</Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
