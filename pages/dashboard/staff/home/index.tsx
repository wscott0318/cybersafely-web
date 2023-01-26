import { alpha, Box, Grid, Paper, Typography, useTheme } from '@mui/material'
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
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import { enUS } from 'date-fns/locale'
import { useMemo } from 'react'
import { Chart } from 'react-chartjs-2'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { StatsByDay, useStatsForStaffQuery } from '../../../../types/graphql'

ChartJS.register(LineController, LineElement, PointElement, LinearScale, TimeScale, Filler)

function ChartCardByDay(props: { title: string; data: StatsByDay[] }) {
  const theme = useTheme()

  const options = useMemo<ChartOptions>(
    () => ({
      animation: false,
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
          backgroundColor: alpha(theme.palette.primary.main, 0.25),
        },
      },
      scales: {
        y: {
          grid: {
            color: theme.palette.divider,
          },
          ticks: {
            color: theme.palette.text.disabled,
          },
          border: {
            color: theme.palette.divider,
          },
        },
        x: {
          type: 'time',
          grid: {
            display: false,
          },
          ticks: {
            color: theme.palette.text.disabled,
          },
          border: {
            color: theme.palette.divider,
          },
          time: {
            unit: 'day',
          },
          adapters: {
            date: {
              locale: enUS,
            },
          },
        },
      },
    }),
    [theme]
  )

  const data = useMemo<ChartData>(
    () => ({
      labels: props.data.map((e) => e.day),
      datasets: [{ data: props.data.map((e) => e.value) }],
    }),
    [props.data]
  )

  return (
    <Paper sx={{ p: 2 }}>
      <Typography textAlign="center" mb={1}>
        {props.title}
      </Typography>
      <Chart type="line" options={options} data={data} />
    </Paper>
  )
}

function Home() {
  const { data } = useStatsForStaffQuery()

  if (!data) {
    return null
  }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <ChartCardByDay title="Created Users" data={data.statsByCreatedUsers} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default withDashboardLayout(Home, {
  title: 'Home',
})
