import { CircularProgress, Stack, Typography } from '@mui/material'

export function UserScore() {
  return (
    <Stack spacing={1} direction="row" alignItems="center">
      <CircularProgress color="success" size={20} variant="determinate" value={100} />
      <Typography color="success.main">Good (100%)</Typography>
    </Stack>
  )
}
