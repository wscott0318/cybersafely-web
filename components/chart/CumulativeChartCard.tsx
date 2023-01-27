import { alpha, Box, Paper, Skeleton, Stack, Typography, useTheme } from '@mui/material'
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
import { useMemo } from 'react'
import { Chart } from 'react-chartjs-2'
import { StatByDay } from '../../types/graphql'

const HEIGHT = 140

ChartJS.register(LineController, LineElement, PointElement, LinearScale, TimeScale, Filler, Tooltip)

const CompactNumberFormatter = Intl.NumberFormat('en-US', { notation: 'compact' })

type CumulativeChartCardProps = {
  title: string
  data?: StatByDay[] | null
  total?: number | null
  helper?: string
}

export function CumulativeChartCard(props: CumulativeChartCardProps) {
  const theme = useTheme()

  const options = useMemo<ChartOptions>(
    () => ({
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          borderWidth: 1,
          caretPadding: 9.5,
          bodyAlign: 'center',
          titleAlign: 'center',
          displayColors: false,
          padding: { x: 12, y: 8 },
          borderColor: theme.palette.divider,
          bodyColor: theme.palette.text.primary,
          titleColor: theme.palette.text.primary,
          backgroundColor: theme.palette.background.paper,
          callbacks: {
            title(tooltipItems) {
              return tooltipItems.map((e) => new Date(e.parsed.x).toLocaleDateString())
            },
            label({ raw }) {
              return CompactNumberFormatter.format(raw as number)
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
          hoverRadius: 3.5,
          hoverBorderWidth: 2.5,
          hoverBorderColor: theme.palette.primary.main,
          hoverBackgroundColor: theme.palette.background.paper,
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
          min: 0,
          offset: true,
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
          offset: true,
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

  const data = useMemo<ChartData>(() => {
    let data = props.data?.map((e) => e.value) ?? []

    if (typeof props.total === 'number') {
      data = data.reduce<number[]>((prev, curr, index, array) => {
        const value = index > 0 ? array[array.length - index] : 0
        const cumulative = index > 0 ? prev[0] - value : props.total ?? 0
        prev.splice(0, 0, cumulative)
        return prev
      }, [])
    }

    return {
      labels: props.data?.map((e) => e.day),
      datasets: [{ data }],
    }
  }, [props.data, props.total])

  const total = useMemo(() => {
    if (typeof props.total === 'number') return props.total
    return data.datasets[0].data.reduce<number>((prev, curr) => prev + (curr as number), 0)
  }, [props.title, data])

  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction="row" spacing={0}>
        <Stack spacing={0} justifyContent="flex-end">
          <Typography color="text.disabled" maxWidth={80}>
            {props.title}
          </Typography>
          {props.data ? (
            <Typography variant="h4">{CompactNumberFormatter.format(total)}</Typography>
          ) : (
            <Skeleton>
              <Typography variant="h4">XX</Typography>
            </Skeleton>
          )}
        </Stack>
        <Box flex={1} position="relative" overflow="hidden">
          {props.data ? (
            <Chart type="line" options={options} data={data} height={HEIGHT} />
          ) : (
            <Skeleton variant="rounded" height={HEIGHT} />
          )}
        </Box>
      </Stack>
      {!!props.helper && (
        <Box textAlign="center" mt={2} pt={1} borderTop={1} borderColor="divider">
          <Typography variant="caption" color="text.disabled">
            {props.helper}
          </Typography>
        </Box>
      )}
    </Paper>
  )
}
