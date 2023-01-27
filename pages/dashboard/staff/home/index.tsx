import { alpha, Box, Grid, Paper, Skeleton, Stack, Typography, useTheme } from '@mui/material'
import {
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Filler,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  TimeScale,
  Tooltip,
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import { format } from 'date-fns'
import { useMemo } from 'react'
import { Chart } from 'react-chartjs-2'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { StatByDay, useStatsForStaffQuery } from '../../../../types/graphql'

ChartJS.register(LineController, LineElement, PointElement, LinearScale, TimeScale, Filler, Tooltip)

const NumberFormatter = Intl.NumberFormat('en-US', { notation: 'compact' })

type CumulativeChartCardProps = {
  title: string
  data: StatByDay[] | undefined | null
  total: number | undefined | null
}

function CumulativeChartCard(props: CumulativeChartCardProps) {
  const theme = useTheme()

  const options = useMemo<ChartOptions>(
    () => ({
      animation: false,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 1.5,
          bottom: 1.5,
        },
      },
      plugins: {
        tooltip: {
          borderWidth: 1,
          bodyAlign: 'center',
          titleAlign: 'center',
          displayColors: false,
          borderColor: theme.palette.divider,
          bodyColor: theme.palette.text.primary,
          titleColor: theme.palette.text.primary,
          backgroundColor: theme.palette.background.paper,
          callbacks: {
            title(tooltipItems) {
              return tooltipItems.map((e) => format(e.parsed.x, 'MMMM d'))
            },
            label({ raw }) {
              return NumberFormatter.format(raw as number)
            },
          },
        },
      },
      interaction: {
        intersect: false,
      },
      elements: {
        point: {
          radius: 0,
          hoverRadius: 0,
        },
        line: {
          fill: true,
          borderWidth: 2.5,
          borderCapStyle: 'round',
          borderJoinStyle: 'round',
          borderColor: theme.palette.primary.main,
          backgroundColor({ chart }) {
            const gradient = chart.ctx.createLinearGradient(0, chart.chartArea.top, 0, chart.chartArea.bottom)
            gradient.addColorStop(0, alpha(theme.palette.primary.main, 0.25))
            gradient.addColorStop(1, alpha(theme.palette.primary.main, 0))
            return gradient
          },
        },
      },
      scales: {
        y: {
          grid: {
            display: false,
          },
          ticks: {
            display: false,
          },
          border: {
            display: false,
          },
        },
        x: {
          type: 'time',
          grid: {
            display: false,
          },
          ticks: {
            display: false,
          },
          border: {
            display: false,
          },
          time: {
            unit: 'day',
          },
        },
      },
    }),
    [theme]
  )

  const data = useMemo<ChartData>(
    () => ({
      labels: props.data?.map((e) => e.day),
      datasets: [
        {
          data:
            props.data
              ?.map((e) => e.value)
              .reduce<number[]>((prev, curr, index, array) => {
                const value = index > 0 ? array[array.length - index] : 0
                const cumulative = index > 0 ? prev[0] - value : props.total ?? 0
                prev.splice(0, 0, cumulative)
                return prev
              }, []) ?? [],
        },
      ],
    }),
    [props.data, props.total]
  )

  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction="row">
        <Stack spacing={0} justifyContent="flex-end">
          <Typography color="text.disabled">{props.title}</Typography>
          {typeof props.total === 'number' ? (
            <Typography variant="h4">{NumberFormatter.format(props.total)}</Typography>
          ) : (
            <Skeleton>
              <Typography variant="h4">XX</Typography>
            </Skeleton>
          )}
        </Stack>
        <Box flex={1} position="relative" overflow="hidden">
          {props.data ? (
            <Chart type="line" options={options} data={data} height={120} />
          ) : (
            <Skeleton variant="rounded" height={120} />
          )}
        </Box>
      </Stack>
    </Paper>
  )
}

function Home() {
  const { data } = useStatsForStaffQuery()

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Stats</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CumulativeChartCard title="Users" data={data?.statsOfCreatedUsers} total={data?.users.page.total} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CumulativeChartCard title="Teams" data={data?.statsOfCreatedTeams} total={data?.teams.page.total} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default withDashboardLayout(Home, {
  title: 'Home',
})
