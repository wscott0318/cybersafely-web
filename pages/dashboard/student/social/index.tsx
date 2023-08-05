import { Grid, Paper, Stack, Typography } from '@mui/material'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { SocialButtonConfig } from '../../../../components/forms/UpdateUserForm'
import { useUser } from '../../../../utils/context/auth'

function Social() {
  const { user, refetchUser } = useUser()

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper sx={{ p: 3, my: 2 }}>
          <Stack spacing={2}>
            <Typography variant="h5">Welcome, {user.name} 😊</Typography>
            <Typography>
              Pariatur adipisicing aliquip magna cillum ipsum proident amet velit dolore officia. Elit incididunt
              voluptate occaecat officia mollit laborum id. Irure deserunt laboris et esse ea.
            </Typography>
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Social Networks</Typography>
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <SocialButtonConfig name="TWITTER" user={user} refetch={refetchUser} />
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <SocialButtonConfig name="FACEBOOK" user={user} refetch={refetchUser} />
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <SocialButtonConfig name="INSTAGRAM" user={user} refetch={refetchUser} />
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <SocialButtonConfig name="TIKTOK" user={user} refetch={refetchUser} />
      </Grid>
      {/* <Grid item xs={12} sm={4} md={3}>
        <SocialButtonConfig name="YOUTUBE" user={user} refetch={refetchUser} />
      </Grid> */}
    </Grid>
  )
}

export default withDashboardLayout(Social, {
  title: 'Social',
})
