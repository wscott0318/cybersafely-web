import { Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { SocialButton } from '../../../../components/common/SocialButton'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { DashboardIntroText } from '../../../../components/shared/DashboardIntroText'
import { useUser } from '../../../../utils/context/auth'

function Home() {
  const router = useRouter()

  const { user } = useUser()

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DashboardIntroText />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" flexGrow={1}>
          Connected Social Networks
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <SocialButton
          icon={<img alt="Twitter" src="/images/logos/twitter.svg" height={16} />}
          name="Twitter"
          color="#1d9bf0"
          linked={!!user.twitter}
          username={user.twitter?.username}
          onLink={async () => '/dashboard/profile'}
          onUnlink={async () => {
            router.push('/dashboard/profile')
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <SocialButton
          icon={<img alt="TikTok" src="/images/logos/tiktok.svg" height={16} />}
          name="TikTok"
          color="#000"
          disabled
        />
      </Grid>
      <Grid item xs={3}>
        <SocialButton
          icon={<img alt="Instagram" src="/images/logos/instagram.svg" height={16} />}
          name="Instagram"
          color="#ff543e"
          disabled
        />
      </Grid>
      <Grid item xs={3}>
        <SocialButton
          icon={<img alt="Facebook" src="/images/logos/facebook.svg" height={16} />}
          name="Facebook"
          color="#0062e0"
          disabled
        />
      </Grid>
      <Grid item xs={3}>
        <SocialButton
          icon={<img alt="YouTube" src="/images/logos/youtube.svg" height={16} />}
          name="YouTube"
          color="#f61c0d"
          disabled
        />
      </Grid>
    </Grid>
  )
}

export default withDashboardLayout(Home, {
  title: 'Home',
})
