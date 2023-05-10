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
      <Box>
        <Typography variant="body2">Socials</Typography>
        {data.user.socials.map((social) => (
          <Typography key={social.id} fontWeight={600}>
            {social.__typename} ({social.username})
          </Typography>
        ))}
      </Box>
    </Stack>
  )
}
