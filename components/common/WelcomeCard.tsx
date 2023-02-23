import { Box, Divider, Typography } from '@mui/material'
import { useUser } from '../../utils/context/auth'

export function WelcomeCard() {
  const { user } = useUser()

  return (
    <Box>
      <Typography mb={1} fontSize="1.4rem">
        Welcome, {user.name} 😊
      </Typography>
      <Divider />
    </Box>
  )
}
