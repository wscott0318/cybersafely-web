import { alpha, AppBar, Box, Button, Container, Divider, Stack, Toolbar, Typography } from '@mui/material'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { z } from 'zod'
import { Form } from '../components/common/form/Form'
import { FormSelect } from '../components/common/form/FormSelect'
import { FormText } from '../components/common/form/FormText'
import { Config } from '../helpers/config'
import { useLogoUrl, useOnTop } from '../helpers/hooks'
import { useContactMutation } from '../schema'
import { useAlert } from '../utils/context/alert'

const TOOLBAR_HEIGHT = 88.5

function Header() {
  const logoUrl = useLogoUrl()
  const { isOnTop } = useOnTop(50)

  return (
    <AppBar
      variant="elevation"
      elevation={isOnTop ? 0 : 2}
      sx={(theme) => ({
        transition: 'all 0.25s linear',
        color: theme.palette.text.primary,
        backdropFilter: isOnTop ? undefined : 'blur(10px)',
        background: isOnTop ? 'transparent' : alpha(theme.palette.background.paper, 0.95),
      })}
    >
      <Toolbar disableGutters>
        <Container disableGutters>
          <Stack spacing={1} alignItems="center" direction="row" px={2} py={2}>
            <NextLink href="/">
              <NextImage
                alt="Logo"
                src={logoUrl}
                height={isOnTop ? 75 : 50}
                width={isOnTop ? 162 : 108}
                style={{ transition: 'all 0.25s linear' }}
              />
            </NextLink>
            <Box flexGrow={1} />
            <Button color="inherit" variant="text" size="large" href="#mission">
              Mission
            </Button>
            <Button color="inherit" variant="text" size="large" href="#contact">
              Contact
            </Button>
            {/* TODO: This can be removed in the future */}
            {Config.enableLogin && (
              <Box pl={1}>
                <NextLink href="/auth/login" passHref legacyBehavior>
                  <Button size="large">Login</Button>
                </NextLink>
              </Box>
            )}
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

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
            <Typography variant="h3">Coming Soon!</Typography>
            <Box width="100%" maxWidth={540}>
              <Box position="relative" paddingTop="46%">
                <NextImage fill sizes="540px" alt="Logo" src={logoUrl} style={{ objectFit: 'contain' }} />
              </Box>
            </Box>
            <Typography variant="h5">
              A tool to help schools educate students on how to pivot negative behavior online
            </Typography>
            <Button size="large" href="#mission">
              Learn More
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}

function Mission() {
  return (
    <Box position="relative">
      <Box id="mission" position="absolute" top={-TOOLBAR_HEIGHT} />
      <Container disableGutters>
        <Stack px={2} py={16} alignItems="center" textAlign="center">
          <Typography variant="h4">Our Mission</Typography>
          <Typography variant="h6">
            We are dedicated to support today’s youth by identifying and educating them on how their future can be
            affected by their behavior on social media. Our mission is designed to help them protect their future
            success by addressing critical societal issues such as bullying, sexual content, suicide and the illegal use
            of weapons.
          </Typography>
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
      <Box id="contact" position="absolute" top={-TOOLBAR_HEIGHT} />
      <Container disableGutters>
        <Stack px={2} py={16} alignItems="center" textAlign="center">
          <Typography variant="h4">Contact</Typography>
          <Typography variant="h6">
            Learn more about how your school can help students pivot damaging behavior.
          </Typography>
          <Box maxWidth={500} width="100%" textAlign="left">
            <Form
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
                <FormText name="firstName" label="First Name" required />
                <FormText name="lastName" label="Last Name" required />
              </Stack>
              <FormText name="email" label="E-mail Address" type="email" required />
              <FormText name="phone" label="Phone Number" type="phone" />
              <FormText name="jobTitle" label="Job Title" />
              <FormText name="schoolName" label="School Name" required />
              <FormText name="state" label="State/Region" required />
              <FormText name="students" label="Number of Students" required />
              <FormSelect
                required
                name="describe"
                label="What best describes your school?"
                options={[
                  { value: 'Public District', title: 'Public District' },
                  { value: 'Private School', title: 'Private School' },
                  { value: 'Other', title: 'Other' },
                ]}
              />
              <FormText name="comments" label="Comments, questions, concerns?" multiline />
            </Form>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

function Footer() {
  const logoUrl = useLogoUrl()

  return (
    <Box textAlign="center" bgcolor="background.paper" py={4} component="footer">
      <Container disableGutters>
        <Stack px={2} alignItems="center" textAlign="center">
          <NextImage alt="Logo" width={162} height={75} src={logoUrl} />
          <Typography>
            &copy; 2022 - {new Date().getFullYear()} {Config.app.name}
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}

export default function Landing() {
  return (
    <Box>
      <Header />
      <Box component="main">
        <Hero />
        <Mission />
        <Divider />
        <Contact />
      </Box>
      <Footer />
    </Box>
  )
}
