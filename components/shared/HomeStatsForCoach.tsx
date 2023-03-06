import CalendarIcon from '@mui/icons-material/CalendarMonthOutlined'
import { Alert, AlertTitle, Box, Grid, InputAdornment, MenuItem, Select, Stack, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import { useStatsForSchoolQuery } from '../../schema'
import { useSchoolRole } from '../../utils/context/auth'
import { CumulativeChartCard } from '../chart/CumulativeChartCard'
import { NextLink } from '../common/NextLink'
import { WelcomeCard } from '../common/WelcomeCard'

type MissingInfoCardProps = {
  href: string
  message: string
}

function MissingInfoCard(props: MissingInfoCardProps) {
  return (
    <NextLink href={props.href}>
      <Alert severity="warning" sx={{ cursor: 'pointer' }}>
        <AlertTitle>Missing Information</AlertTitle>
        {props.message}
      </Alert>
    </NextLink>
  )
}

function useMissingCards() {
  const schoolRole = useSchoolRole()

  const cards = useMemo(() => {
    const cards: MissingInfoCardProps[] = []

    if (schoolRole) {
      if (!schoolRole.school.logo) {
        cards.push({ href: '/dashboard/school', message: 'School Logo' })
      }

      if (!schoolRole.school.cover) {
        cards.push({ href: '/dashboard/school', message: 'School Cover' })
      }

      cards.push({ href: '/dashboard/school', message: 'Billing' })
    }

    return cards
  }, [schoolRole])

  return {
    cards,
    hasCards: cards.length > 0,
  }
}

export function HomeStatsForCoach() {
  const schoolRole = useSchoolRole()
  const { cards, hasCards } = useMissingCards()

  const [days, setDays] = useState(14)

  const { data } = useStatsForSchoolQuery({
    variables: { schoolId: schoolRole!.school.id, days },
  })

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <WelcomeCard />
        </Grid>
        {hasCards && (
          <Grid item xs={12}>
            <Typography variant="h5" flexGrow={1}>
              Cards
            </Typography>
          </Grid>
        )}
        {cards.map((card, index) => (
          <Grid key={String(index)} item xs={12} sm={6} md={4}>
            <MissingInfoCard {...card} />
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
