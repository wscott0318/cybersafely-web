import { Box, Divider, Grid, Paper, Stack, Typography } from '@mui/material'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { SocialButtonConfig } from '../../../../components/forms/UpdateUserForm'
import FacebookIcon from '../../../../public/images/logos/facebook.svg'
import InstagramIcon from '../../../../public/images/logos/instagram.svg'
import TiktokIcon from '../../../../public/images/logos/tiktok.svg'
import TwitterIcon from '../../../../public/images/logos/twitter-x.svg'
import { useUser } from '../../../../utils/context/auth'

function Social() {
  const { user, refetchUser } = useUser()

  return (
    <Grid container spacing={2} pb="20%">
      <Grid item xs={12}>
        <Typography variant="h5" fontWeight="bold">
          Social Networks
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" width="100%" flexWrap="wrap" spacing={0} gap={2}>
          <Paper sx={{ flex: '1', minWidth: '320px', p: 2, pt: 4 }}>
            <Stack justifyContent="center" alignItems="center">
              <Stack
                sx={{
                  backgroundColor: '#F4F7FB',
                  borderRadius: '50%',
                  p: 3,
                }}
              >
                <TwitterIcon style={{ fill: '#00acee', width: '30px', height: '30px' }} />
              </Stack>
              <Typography fontWeight="bold">Twitter</Typography>
              <Typography variant="body2" fontWeight="300" textAlign="center">
                Lorem ipsum dolor sit amet, adipiscing elit beatae vitae dicta sunt explicabo.
              </Typography>
              <Divider sx={{ width: '100%' }} />
              <Box alignSelf="end">
                <SocialButtonConfig name="TWITTER" user={user} refetch={refetchUser} onlyButton />
              </Box>
            </Stack>
          </Paper>
          <Paper sx={{ flex: '1', minWidth: '320px', p: 2, pt: 4 }}>
            <Stack justifyContent="center" alignItems="center">
              <Stack
                sx={{
                  backgroundColor: '#F4F7FB',
                  borderRadius: '50%',
                  p: 3,
                }}
              >
                <FacebookIcon style={{ fill: '#4267B2', width: '30px', height: '30px' }} />
              </Stack>
              <Typography fontWeight="bold">Facebook</Typography>
              <Typography variant="body2" fontWeight="300" textAlign="center">
                Lorem ipsum dolor sit amet, adipiscing elit beatae vitae dicta sunt explicabo.
              </Typography>
              <Divider sx={{ width: '100%' }} />
              <Box alignSelf="end">
                <SocialButtonConfig name="FACEBOOK" user={user} refetch={refetchUser} onlyButton />
              </Box>
            </Stack>
          </Paper>
          <Paper sx={{ flex: '1', minWidth: '320px', p: 2, pt: 4 }}>
            <Stack justifyContent="center" alignItems="center">
              <Stack
                sx={{
                  backgroundColor: '#F4F7FB',
                  borderRadius: '50%',
                  p: 3,
                }}
              >
                <InstagramIcon style={{ fill: '#F91966', width: '30px', height: '30px' }} />
              </Stack>
              <Typography fontWeight="bold">Instagram</Typography>
              <Typography variant="body2" fontWeight="300" textAlign="center">
                Lorem ipsum dolor sit amet, adipiscing elit beatae vitae dicta sunt explicabo.
              </Typography>
              <Divider sx={{ width: '100%' }} />
              <Box alignSelf="end">
                <SocialButtonConfig name="INSTAGRAM" user={user} refetch={refetchUser} onlyButton />
              </Box>
            </Stack>
          </Paper>
          <Paper sx={{ flex: '1', minWidth: '320px', p: 2, pt: 4 }}>
            <Stack justifyContent="center" alignItems="center">
              <Stack
                sx={{
                  backgroundColor: '#F4F7FB',
                  borderRadius: '50%',
                  p: 3,
                }}
              >
                <TiktokIcon style={{ fill: '#000', width: '30px', height: '30px' }} />
              </Stack>
              <Typography fontWeight="bold">Tiktok</Typography>
              <Typography variant="body2" fontWeight="300" textAlign="center">
                Lorem ipsum dolor sit amet, adipiscing elit beatae vitae dicta sunt explicabo.
              </Typography>
              <Divider sx={{ width: '100%' }} />
              <Box alignSelf="end">
                <SocialButtonConfig name="TIKTOK" user={user} refetch={refetchUser} onlyButton />
              </Box>
            </Stack>
          </Paper>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default withDashboardLayout(Social, {
  title: 'Social',
})
