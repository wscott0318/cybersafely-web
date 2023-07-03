import { Paper, Stack, Typography } from '@mui/material'
import { useUser } from '../../utils/context/auth'

export function DashboardIntroText() {
  const { user } = useUser()

  return (
    <Paper sx={{ p: 3, my: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h5">Welcome, {user.name} 😊</Typography>
        <Typography>
          Welcome to CyberSafely.ai, a cutting-edge platform designed to help keep students safe and secure on social
          media. We're thrilled to have you as part of our beta testing program, and we're confident that your feedback
          and participation will help shape the future of online safety.
        </Typography>
        <Typography>
          As a member of CyberSafely.ai, you'll have access to an advanced software that can identify danger and
          threats, such as bullying, sextortion, suicide, and illegal use of weapons. Our platform uses the latest AI
          technology to analyze a concerning post, determine the level of urgency, and send an alert to those designated
          for their review
        </Typography>
        <Typography>
          In addition to our software features, we're committed to providing a user-friendly experience that is tailored
          to your needs. Whether you're a tech-savvy individual or new to the digital world, our platform is designed to
          be intuitive and easy to use. We are available for any questions and welcome your feedback throughout beta
          testing.
        </Typography>
        <Typography>
          Thank you for joining us on this journey, and we look forward to working with you to create a safer
          environment on social media for all.
        </Typography>
      </Stack>
    </Paper>
  )
}
