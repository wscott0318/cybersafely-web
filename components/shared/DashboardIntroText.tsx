import { Paper, Stack, Typography } from '@mui/material'
import { useUser } from '../../utils/context/auth'

export function DashboardIntroText() {
  const { user } = useUser()

  return (
    <Paper sx={{ p: 3, my: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h5">Welcome, {user.name} 😊</Typography>
        <Typography>
          Welcome to CyberSafely.ai, a cutting-edge platform designed to keep you safe and secure in the digital world.
          We're thrilled to have you as part of our pilot program, and we're confident that your feedback and
          participation will help shape the future of online safety.
        </Typography>
        <Typography>
          As a member of CyberSafely.ai, you'll have access to advanced security features and tools that will protect
          you from online threats, such as phishing scams, malware, and identity theft. Our platform uses the latest AI
          technology to analyze and detect potential risks, so you can browse the web with peace of mind.
        </Typography>
        <Typography>
          In addition to our security features, we're committed to providing a user-friendly experience that's tailored
          to your needs. Whether you're a tech-savvy individual or new to the digital world, our platform is designed to
          be intuitive and easy to use.
        </Typography>
        <Typography>
          Thank you for joining us on this journey, and we look forward to working with you to create a safer online
          environment for all.
        </Typography>
      </Stack>
    </Paper>
  )
}
