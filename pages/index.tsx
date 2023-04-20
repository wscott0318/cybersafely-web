import { Box, Button, Container, Divider, List, ListItem, Stack, Typography } from '@mui/material'
import NextImage from 'next/image'
import { z } from 'zod'
import { Form } from '../components/common/form/Form'
import { FormSelect } from '../components/common/form/FormSelect'
import { FormText } from '../components/common/form/FormText'
import LandingLayout from '../components/layout/LandingLayout'
import { useLogoUrl, useMobile } from '../helpers/hooks'
import { useContactMutation } from '../schema'
import { useAlert } from '../utils/context/alert'

function Hero() {
  const logoUrl = useLogoUrl()

  return (
    <Box position="relative">
      <NextImage
        fill
        alt="Hero"
        sizes="100vw"
        src="/images/landing/hero.jpg"
        style={{
          zIndex: -1,
          opacity: 0.3,
          objectFit: 'cover',
        }}
      />
      <Box minHeight="100vh" display="flex" alignItems="center">
        <Container disableGutters>
          <Stack alignItems="center" textAlign="center" spacing={8} px={2} py={16}>
            <Box width="100%" maxWidth={540}>
              <Box position="relative" paddingTop="46%">
                <NextImage fill sizes="540px" alt="Logo" src={logoUrl} style={{ objectFit: 'contain' }} />
              </Box>
            </Box>
            <Typography variant="h5" fontWeight="bold">
              A tool to help schools increase student safety
            </Typography>
            <Button sx={{ py: 2 }} size="large" href="https://forms.office.com/r/ggKZYL0acy" target="_blank">
              Join our pilot program!
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}

function Section1() {
  const { isMobile } = useMobile()

  return (
    <Box position="relative" bgcolor="primary.main">
      <Container disableGutters>
        <Stack px={isMobile ? 2 : 16} py={16} alignItems="flex-start" textAlign="center">
          <Typography variant="h4" fontWeight="bold" textAlign="left">
            Help protect today’s youth and their future success
          </Typography>
          <Typography variant="h6" textAlign="left">
            One of the most concerning areas for parents and schools has been students’ use of social media. Online
            threats and other harmful activity directed toward our youth has increased at an alarming rate.
          </Typography>
          <Typography variant="h6" textAlign="left">
            Promising young athletes have had their lives and careers negatively impacted by certain activity on social
            media.
          </Typography>
          <Typography variant="h6" textAlign="left">
            CyberSafely.ai™ is a multifaceted approach to help schools, parents, and other youth organizations, identify
            and respond to these threats.
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}

function Section2() {
  const { isMobile } = useMobile()

  return (
    <Box position="relative">
      <Container disableGutters>
        <Stack px={isMobile ? 2 : 16} py={16} alignItems="flex-start" textAlign="center">
          <Typography variant="h4" fontWeight="bold" textAlign="left">
            The intent is to help students, not to invade their privacy
          </Typography>
          <Typography variant="h6" textAlign="left">
            CyberSafely.ai™ is designed to help protect student safety and welfare by teaching them to be aware of and
            identify harmful activity received.
          </Typography>
          <Typography variant="h6" textAlign="left">
            In addition, by choosing to pivot negative behavior before it is sent, students will benefit, and have an
            edge as they compete toward college and career.
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            How It Works:
          </Typography>
          <List sx={{ px: 4 }}>
            <ListItem
              sx={{
                padding: 0,
                listStyleType: 'disc',
                display: 'list-item',
              }}
            >
              <Typography variant="h6" textAlign="left">
                CyberSafely.ai™ provides real-time information on the student’s social media accounts
              </Typography>
            </ListItem>
            <ListItem
              sx={{
                padding: 0,
                listStyleType: 'disc',
                display: 'list-item',
              }}
            >
              <Typography variant="h6" textAlign="left">
                It scans for pre-determined, variable areas of concern such as bullying, suicide, sexual content, and
                illegal use of weapons
              </Typography>
            </ListItem>
            <ListItem
              sx={{
                padding: 0,
                listStyleType: 'disc',
                display: 'list-item',
              }}
            >
              <Typography variant="h6" textAlign="left">
                The software will identify and send a report to designated recipients for review and response
              </Typography>
            </ListItem>
          </List>
        </Stack>
      </Container>
    </Box>
  )
}

function Section3() {
  const { isMobile } = useMobile()

  return (
    <Box position="relative" bgcolor="primary.main">
      <Container disableGutters>
        <Stack px={isMobile ? 2 : 16} py={16} alignItems="flex-start" textAlign="center">
          <Typography variant="h4" fontWeight="bold" textAlign="left">
            About Us
          </Typography>
          <Typography variant="h6" textAlign="left">
            We are dedicated to support today’s youth by identifying and educating them on how their future can be
            affected by their behavior on social media.
          </Typography>
          <Typography variant="h6" textAlign="left">
            Our founder, Neal Alexander, has spent many years in the security industry, and in coaching youth sports
            teams. His experience is what led him to create CyberSafely.ai™.
          </Typography>
          <Typography variant="h6" textAlign="left">
            <Typography display="inline" sx={{ fontStyle: 'italic' }}>
              “I received a letter many, many years ago from a parent thanking me for the time I spent with their child
              as a coach and letting me know the influence I had. This sticks with me and I think about it often.
              Coaches truly have a great opportunity to influence, for the rest of their lives, our youth and we can
              help them do that.”, -{' '}
            </Typography>
            <Typography display="inline" fontWeight="bold">
              Neal Alexander, Founder, CyberSafely.ai™
            </Typography>
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}

function Section4() {
  const { isMobile } = useMobile()

  return (
    <Box position="relative">
      <Container disableGutters>
        <Stack px={isMobile ? 2 : 16} py={16} alignItems="flex-start" textAlign="center">
          <Typography variant="h4" fontWeight="bold" textAlign="left">
            Pilot School Program
          </Typography>
          <Typography variant="h6" textAlign="left">
            CyberSafely.ai™ is currently selecting schools to participate in the Pilot School Program.
          </Typography>
          <Typography variant="h6" textAlign="left">
            Participating schools are asked to serve in an advisory role and testing of the web-based application. We
            are suggesting each school select 100-200 students.
          </Typography>
          <Typography variant="h6" textAlign="left">
            To show our appreciation to all of our Pilot Schools, CyberSafely.ai™ is proud to offer a $500 Scholarship
            awarded to a student of their choice, every year the school is in the program.
          </Typography>
          <Box sx={{ alignSelf: 'center' }}>
            <Button sx={{ mt: 2, px: 4 }} size="large" href="mailto:tonyf@cybersafely.ai" target="_blank">
              Contact Us
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

const schema = z.object({
  firstName: z.string().min(4),
  lastName: z.string().min(4),
  email: z.string().email(),
  phone: z.string().optional(),
  jobTitle: z.string().optional(),
  schoolName: z.string().min(4),
  state: z.string().min(4),
  students: z.string().regex(/[0-9]+/),
  describe: z.string(),
  comments: z.string().optional(),
})

function Contact() {
  const { pushAlert } = useAlert()

  const [contact] = useContactMutation()

  return (
    <Box position="relative">
      <Container disableGutters>
        <Stack px={2} py={16} alignItems="center" textAlign="center">
          <Typography variant="h4">Contact</Typography>
          <Typography variant="h6">
            Learn more about how your school can help students pivot damaging behavior.
          </Typography>
          <Box maxWidth={500} width="100%" textAlign="left">
            <Form
              buttonProps={{ sx: { fontSize: 18, py: 1.5 } }}
              schema={schema}
              onSubmit={async (input) => {
                await contact({ variables: { input } })

                pushAlert({
                  type: 'alert',
                  title: 'Success',
                  message: 'Your message was successfully sent!',
                })
              }}
            >
              <Stack direction="row">
                <FormText
                  inputProps={{ variant: 'outlined', size: 'medium' }}
                  name="firstName"
                  label="First Name"
                  required
                />
                <FormText
                  inputProps={{ variant: 'outlined', size: 'medium' }}
                  name="lastName"
                  label="Last Name"
                  required
                />
              </Stack>
              <FormText
                inputProps={{ variant: 'outlined', size: 'medium' }}
                name="email"
                label="E-mail Address"
                type="email"
                required
              />
              <FormText
                inputProps={{ variant: 'outlined', size: 'medium' }}
                name="phone"
                label="Phone Number"
                type="phone"
              />
              <FormText inputProps={{ variant: 'outlined', size: 'medium' }} name="jobTitle" label="Job Title" />
              <FormText
                inputProps={{ variant: 'outlined', size: 'medium' }}
                name="schoolName"
                label="School Name"
                required
              />
              <FormText
                inputProps={{ variant: 'outlined', size: 'medium' }}
                name="state"
                label="State/Region"
                required
              />
              <FormText
                inputProps={{ variant: 'outlined', size: 'medium' }}
                name="students"
                label="Number of Students"
                required
              />
              <FormSelect
                variant="outlined"
                inputProps={{ variant: 'outlined', size: 'medium', label: 'What best describes your school?' }}
                required
                name="describe"
                label="What best describes your school?"
                options={[
                  { value: 'Public District', title: 'Public District' },
                  { value: 'Private School', title: 'Private School' },
                  { value: 'Other', title: 'Other' },
                ]}
              />
              <FormText
                inputProps={{ variant: 'outlined', size: 'medium' }}
                name="comments"
                label="Comments, questions, concerns?"
                multiline
              />
            </Form>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

export default function Landing() {
  return (
    <LandingLayout>
      <Hero />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Divider />
      <Contact />
    </LandingLayout>
  )
}
