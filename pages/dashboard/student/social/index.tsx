import { Alert, Grid, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { SocialButtonConfig } from '../../../../components/forms/UpdateUserForm'
import { useUser } from '../../../../utils/context/auth'

function Social() {
  const router = useRouter()

  const { user, refetchUser } = useUser()

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Stack flexGrow={1} spacing={1}>
          <Typography variant="h5">Social Networks</Typography>
          <Alert severity="info">
            Right now we only support Twitter, Facebook but more social integrations are rolling out weekly, please
            check back for additions.
          </Alert>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <SocialButtonConfig name="TWITTER" user={user} refetch={refetchUser} />
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <SocialButtonConfig name="FACEBOOK" user={user} refetch={refetchUser} />
      </Grid>
      {/* <Grid item xs={12} sm={4} md={3}>
        <SocialButtonConfig name="INSTAGRAM" user={user} refetch={refetchUser} />
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <SocialButtonConfig name="TIKTOK" user={user} refetch={refetchUser} />
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <SocialButtonConfig name="YOUTUBE" user={user} refetch={refetchUser} />
      </Grid> */}
    </Grid>
  )
}

export default withDashboardLayout(Social, {
  title: 'Social',
})
