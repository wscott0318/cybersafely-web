import { Box, ButtonBase, Card, Container, Stack, Typography } from '@mui/material'
import LandingLayout from '../components/layout/LandingLayout'
import { useMobile } from '../helpers/hooks'

const GETTING_STARTED_RESOURCES = [
  {
    name: 'Parents Social Media Mistakes',
    url: '/pdf/Parents_Social_Media_Mistakes.pdf',
  },
  {
    name: 'Snapchat AI Tool',
    url: '/pdf/Snapchat_AI_Tool.pdf',
  },
  {
    name: 'Surgeon General Warning',
    url: '/pdf/Surgeon_General_Warning.pdf',
  },
  {
    name: 'Understanding Teen Lingo',
    url: '/pdf/Understanding_Teen_Lingo.pdf',
  },
]

const THIRD_PARTY_RESOURCES = [
  {
    name: 'Suicide and Crisis Lifeline',
    url: 'https://988lifeline.org/',
    phone: '988',
  },
  {
    name: 'Active Minds',
    url: 'https://www.activeminds.org/',
    phone: '800-273-TALK',
  },
  {
    name: 'American Foundation for Suicide Prevention',
    url: 'https://afsp.org/',
  },
  {
    name: 'Cyberbullying Research Center',
    url: 'https://cyberbullying.org/',
  },
  {
    name: 'Ditch the Label',
    url: 'https://www.ditchthelabel.org/',
    phone: '323-922-3741',
  },
  {
    name: 'FindTreatment.gov',
    url: 'FindTreatment.gov',
    phone: '800-662-HELP (4357)',
  },
  {
    name: 'Help Network of Northeast Ohio',
    url: 'https://www.helpnetworkneo.org/',
    phone: '330-747-2696',
  },
  {
    name: 'Love is Respect',
    url: 'https://www.loveisrespect.org/',
    phone: '866-331-9474',
  },
  {
    name: 'Mental Health America',
    url: 'https://www.mhanational.org/finding-help',
    phone: '703-684-7722',
  },
  {
    name: 'MentalHealth.gov',
    url: 'https://www.mentalhealth.gov/',
  },
  {
    name: 'My Life is Worth Living',
    url: 'https://mylifeisworthliving.org/',
  },
  {
    name: 'Net Positive',
    url: 'https://www.benetpositive.org/',
  },
  {
    name: 'Not OK App',
    url: 'https://www.notokapp.com/',
  },
  {
    name: 'Organization for Social Media Safety',
    url: 'https://www.socialmediasafety.org/',
    phone: '855-446-3767',
  },
  {
    name: 'ParentGuidance.org',
    url: 'https://parentguidance.org/',
  },
  {
    name: 'SAMHSA (Substance Abuse and Mental Health Services Administration)',
    url: 'https://www.samhsa.gov/',
    phone: '800-662-HELP (4357)',
  },
  {
    name: 'SchoolSafety.gov',
    url: 'https://www.schoolsafety.gov/',
  },
  {
    name: 'stopbullying.gov',
    url: 'https://www.stopbullying.gov/',
  },
  {
    name: 'The Trevor Project',
    url: 'https://www.thetrevorproject.org/',
    phone: '866-488-7386',
  },
  {
    name: 'Your Life Your Voice',
    url: 'https://www.yourlifeyourvoice.org/Pages/home.aspx',
    phone: '800-448-3000',
  },
]

export default function Resources() {
  const { isMobile } = useMobile()

  return (
    <LandingLayout>
      <Box position="relative">
        <Container disableGutters>
          <Stack px={isMobile ? 2 : 16} py={16} alignItems="flex-start" spacing={8}>
            <Stack>
              <Typography variant="h3" fontWeight="bold">
                Resources
              </Typography>
              <Typography variant="h6">
                Welcome to our resources webpage! Here you will find a variety of resources related to child safety. We
                are constantly adding new resources to our webpage, so be sure to check back often.
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="h5" fontWeight="bold">
                Getting started with CyberSafely.ai™
              </Typography>
              <Typography variant="h6">
                Videos or how-to PDF’s on how to sign up and create a CyberSafely.ai account for your school.
              </Typography>
              <Stack display="inline-flex" direction="row" flexWrap="wrap" spacing={0} gap={1}>
                {GETTING_STARTED_RESOURCES.map((item) => (
                  <Card key={item.name} sx={{ p: 2 }}>
                    <ButtonBase href={item.url}>
                      <Stack spacing={0}>
                        <Typography fontWeight="bold">{item.name}</Typography>
                      </Stack>
                    </ButtonBase>
                  </Card>
                ))}
              </Stack>
            </Stack>
            <Stack>
              <Typography variant="h6">
                View our list of third party organizations that can help you with child safety issues you may be facing.
              </Typography>
              <Stack display="inline-flex" direction="row" flexWrap="wrap" spacing={0} gap={1}>
                {THIRD_PARTY_RESOURCES.map((item) => (
                  <Card key={item.name} sx={{ p: 2 }}>
                    <ButtonBase href={item.url}>
                      <Stack spacing={0}>
                        <Typography fontWeight="bold">{item.name}</Typography>
                        <Typography variant="body2">{item.phone}</Typography>
                      </Stack>
                    </ButtonBase>
                  </Card>
                ))}
              </Stack>
            </Stack>
            <Stack>
              <Typography variant="h6">Schools</Typography>
              <Card sx={{ p: 2 }}>
                <ButtonBase href="/pdf/Teacher_Cyberbullying.pdf">
                  <Stack spacing={0}>
                    <Typography fontWeight="bold">Cyberbullying Warning Signs</Typography>
                  </Stack>
                </ButtonBase>
              </Card>
            </Stack>
            <Stack>
              <Typography variant="h6">Parents</Typography>
              <Stack direction="row">
                <Card sx={{ p: 2 }}>
                  <ButtonBase href="/pdf/Parent_Tech.Contract.pdf">
                    <Stack spacing={0}>
                      <Typography fontWeight="bold">Parent Tech Contract</Typography>
                    </Stack>
                  </ButtonBase>
                </Card>
                <Card sx={{ p: 2 }}>
                  <ButtonBase href="/pdf/Parent_New.Device.Conversation.pdf">
                    <Stack spacing={0}>
                      <Typography fontWeight="bold">New Device Guidance</Typography>
                    </Stack>
                  </ButtonBase>
                </Card>
              </Stack>
            </Stack>
            <Stack>
              <Typography variant="h6">Students</Typography>
              <Card sx={{ p: 2 }}>
                <ButtonBase href="/pdf/Students_Online.Safety.Tips.pdf">
                  <Stack spacing={0}>
                    <Typography fontWeight="bold">Online Safety Tips</Typography>
                  </Stack>
                </ButtonBase>
              </Card>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </LandingLayout>
  )
}
