import UnlinkIcon from '@mui/icons-material/LinkOffOutlined'
import { Accordion, AccordionDetails, AccordionSummary, Button, ButtonGroup, Grid, Tooltip } from '@mui/material'
import React from 'react'
import { AccordionContext } from '../../../components/common/AccordionContext'
import { withDashboardLayout } from '../../../components/dashboard/Layout'
import { UpdatePasswordForm } from '../../../components/form/UpdatePasswordForm'
import { UpdateAvatarForm, UpdateProfileForm } from '../../../components/form/UpdateProfileForm'

function Profile() {
  return (
    <AccordionContext title="Profile" initialSelected={1}>
      <Accordion>
        <AccordionSummary>Avatar</AccordionSummary>
        <AccordionDetails>
          <UpdateAvatarForm />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Profile</AccordionSummary>
        <AccordionDetails>
          <UpdateProfileForm />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Password</AccordionSummary>
        <AccordionDetails>
          <UpdatePasswordForm />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Socials</AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <SocialButton
                icon={<img src="/images/logos/tiktok.svg" height={16} />}
                name="TikTok"
                color="#000"
                linked
              />
            </Grid>
            <Grid item xs={6}>
              <SocialButton icon={<img src="/images/logos/twitter.svg" height={16} />} name="Twitter" color="#1d9bf0" />
            </Grid>
            <Grid item xs={6}>
              <SocialButton
                icon={<img src="/images/logos/instagram.svg" height={16} />}
                name="Instagram"
                color="#ff543e"
              />
            </Grid>
            <Grid item xs={6}>
              <SocialButton
                icon={<img src="/images/logos/facebook.svg" height={16} />}
                name="Facebook"
                color="#0062e0"
              />
            </Grid>
            <Grid item xs={6}>
              <SocialButton icon={<img src="/images/logos/youtube.svg" height={16} />} name="YouTube" color="#f61c0d" />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </AccordionContext>
  )
}

function SocialButton(props: { icon: React.ReactNode; name: string; color: string; linked?: boolean }) {
  if (props.linked) {
    return (
      <ButtonGroup fullWidth variant="outlined" color="inherit" sx={{ color: props.color }}>
        <Button startIcon={props.icon} sx={{ textTransform: 'unset' }}>
          @username
        </Button>
        <Tooltip title={`Unlink ${props.name}`}>
          <Button sx={{ maxWidth: 40 }}>
            <UnlinkIcon fontSize="small" />
          </Button>
        </Tooltip>
      </ButtonGroup>
    )
  }

  return (
    <Button
      fullWidth
      color="inherit"
      variant="outlined"
      startIcon={props.icon}
      sx={{ color: props.color, textTransform: 'unset' }}
    >
      Link {props.name}
    </Button>
  )
}

export default withDashboardLayout(Profile, {
  title: 'Profile',
  maxWidth: 'sm',
})
