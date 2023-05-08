import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import { useUserQuery } from '../../schema'

export function StudentDetails({ userId: id }: { userId: string }) {
  const { data } = useUserQuery({
    variables: { id },
  })

  if (!data) {
    return <CircularProgress />
  }

  return (
    <Stack>
      <Box>
        <Typography variant="body2">Name</Typography>
        <Typography fontWeight={600}>{data.user.name}</Typography>
      </Box>
      <Box>
        <Typography variant="body2">E-mail</Typography>
        <Typography fontWeight={600}>{data.user.email}</Typography>
      </Box>
      {data.user.twitter && (
        <Box>
          <Typography variant="body2">
            Twitter ({new Date(data.user.twitter.createdAt).toLocaleDateString()})
          </Typography>
          <Typography fontWeight={600}>{data.user.twitter.username}</Typography>
        </Box>
      )}
    </Stack>
  )
}
