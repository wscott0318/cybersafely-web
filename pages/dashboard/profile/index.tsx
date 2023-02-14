import { Accordion, AccordionDetails, AccordionSummary, Button, Stack } from '@mui/material'
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
          <Stack spacing={1}>
            <Button variant="outlined" disabled>
              Linked TikTok
            </Button>
            <Button variant="outlined">Link Twitter</Button>
            <Button variant="outlined">Link Instagram</Button>
            <Button variant="outlined">Link Facebook</Button>
            <Button variant="outlined">Link YouTube</Button>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </AccordionContext>
  )
}

export default withDashboardLayout(Profile, {
  title: 'Profile',
  maxWidth: 'sm',
})
