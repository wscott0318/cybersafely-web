import { Box, Container, List, ListItem, Stack, Typography } from '@mui/material'
import LandingLayout from '../components/layout/LandingLayout'
import { useMobile } from '../helpers/hooks'

export default function Funding() {
  const { isMobile } = useMobile()

  return (
    <LandingLayout>
      <Box position="relative">
        <Container disableGutters>
          <Stack px={isMobile ? 2 : 16} py={16} alignItems="flex-start" spacing={8}>
            <Stack>
              <Typography variant="h3" fontWeight="bold">
                Funding Development Assistance
              </Typography>
              <Typography variant="h6">
                CyberSafely.ai is a fee-based program with guidance in securing funding offered at no cost to interested
                schools. Based on your school’s resources, a funding specialist can:
              </Typography>
              <List sx={{ px: 4 }}>
                <ListItem
                  sx={{
                    padding: 0,
                    listStyleType: 'decimal',
                    display: 'list-item',
                  }}
                >
                  <Typography variant="h6" textAlign="left">
                    Provide a list of grants and other funding opportunities your school is eligible for and share best
                    practices to ensure your request is seriously considered for funding.
                  </Typography>
                </ListItem>
                <ListItem
                  sx={{
                    padding: 0,
                    listStyleType: 'decimal',
                    display: 'list-item',
                  }}
                >
                  <Typography variant="h6" textAlign="left">
                    Provide a narrative to justify the need for your project to submit as part of your proposal.
                  </Typography>
                </ListItem>
                <ListItem
                  sx={{
                    padding: 0,
                    listStyleType: 'decimal',
                    display: 'list-item',
                  }}
                >
                  <Typography variant="h6" textAlign="left">
                    Provide referrals to professional grant writers with a proven history of success with no obligation
                    for you to use these referrals.
                  </Typography>
                </ListItem>
              </List>
              <Typography variant="h6">
                Please complete the School Funding Assistance Interest Form to learn of current opportunities that may
                cover these expenses.
              </Typography>
              <Typography variant="h6">Funding Assistance Form:</Typography>
              <iframe
                width="100%"
                height="680px"
                src="https://forms.office.com/Pages/ResponsePage.aspx?id=K1KT9PdlWEqoxo4hgW8IE92RqV6TryxEvozrEd7vpfhUQUdVQTFLVVFWQTdZTTI5VzNZM1BMTDFBUS4u&embed=true"
              />
            </Stack>
          </Stack>
        </Container>
      </Box>
    </LandingLayout>
  )
}
