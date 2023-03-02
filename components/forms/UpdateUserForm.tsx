import UnlinkIcon from '@mui/icons-material/CloseOutlined'
import OpenIcon from '@mui/icons-material/OpenInNewOutlined'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ButtonGroup,
  Grid,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import { useCallback } from 'react'
import { z } from 'zod'
import { addIssue } from '../../helpers/zod'
import { UserQuery, useUpdatePasswordMutation, useUpdateUserMutation, useUserQuery } from '../../schema'
import { useAlert } from '../../utils/context/alert'
import { AccordionContext } from '../common/AccordionContext'
import { Form } from '../common/form/Form'
import { FormAvatar } from '../common/form/FormAvatar'
import { FormText } from '../common/form/FormText'
import { checkPasswordStrength } from '../common/PasswordStrength'
import { QueryLoader, QueryLoaderRenderProps } from '../common/QueryLoader'

type SocialButtonProps = {
  icon: React.ReactNode
  name: string
  color: string
  linked?: boolean
}

function SocialButton(props: SocialButtonProps) {
  if (props.linked) {
    return (
      <ButtonGroup fullWidth variant="contained">
        <Button
          startIcon={props.icon}
          sx={(theme) => ({
            color: 'white',
            bgcolor: props.color,
            textTransform: 'unset',
            justifyContent: 'flex-start',
            borderColor: theme.palette.background.paper + ' !important',
            ':hover': {
              bgcolor: props.color,
            },
          })}
        >
          @username
        </Button>
        <Tooltip title={`Unlink ${props.name}`}>
          <Button
            sx={{
              maxWidth: 40,
              color: 'white',
              bgcolor: props.color,
              textTransform: 'unset',
              ':hover': {
                bgcolor: props.color,
              },
            }}
          >
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
      endIcon={<OpenIcon />}
      startIcon={props.icon}
      sx={{
        color: 'white',
        bgcolor: props.color,
        textTransform: 'unset',
        justifyContent: 'flex-start',
        ':hover': {
          bgcolor: props.color,
        },
      }}
    >
      <Typography variant="inherit" flexGrow={1} textAlign="start">
        Link {props.name}
      </Typography>
    </Button>
  )
}

function Loading() {
  return (
    <Stack>
      <Skeleton variant="text">
        <Typography variant="h5">Loading</Typography>
      </Skeleton>
      <Stack spacing={1}>
        <Skeleton variant="rounded" height={56} />
        <Skeleton variant="rounded" height={56} />
        <Skeleton variant="rounded" height={56} />
      </Stack>
    </Stack>
  )
}

const accountSchema = z.object({
  newEmail: z.string().email(),
  name: z.string().min(4),
})

const passwordSchema = z
  .object({
    oldPassword: z.string().min(4),
    newPassword: z
      .string()
      .min(4)
      .refine((password) => checkPasswordStrength(password) > 50, 'Password is too weak'),
    repeatNewPassword: z.string(),
  })
  .superRefine(({ newPassword, repeatNewPassword }, ctx) => {
    if (newPassword !== repeatNewPassword) {
      addIssue('repeatNewPassword', "The passwords don't match", ctx)
    }
  })

function Render({
  onChange,
  include,
  exclude,
  data: { user },
  query: { refetch },
}: UpdateUserFormProps & QueryLoaderRenderProps<UserQuery>) {
  const { pushAlert } = useAlert()

  const [updateUser] = useUpdateUserMutation()
  const [updatePassword] = useUpdatePasswordMutation()

  const isShown = useCallback(
    (section: Section) => {
      if (include && include.length > 0) {
        return include.includes(section)
      }
      if (exclude && exclude.length > 0) {
        return !exclude.includes(section)
      }
      return false
    },
    [include, exclude]
  )

  return (
    <AccordionContext title="Profile">
      {isShown('information') && (
        <Accordion>
          <AccordionSummary>Information</AccordionSummary>
          <AccordionDetails>
            <Form
              submit="Update"
              schema={accountSchema}
              defaultValues={{
                name: user.name,
                newEmail: user.email,
              }}
              onSubmit={async (data, input) => {
                await updateUser({ variables: { id: user.id, input } })
                await refetch()
                onChange?.()

                if (!!input.newEmail) {
                  pushAlert({
                    type: 'alert',
                    title: 'Verify E-mail',
                    message: 'Please check your inbox and follow the instructions',
                  })
                }
              }}
            >
              <Stack direction="row" alignItems="center" spacing={3}>
                <FormAvatar
                  forId={user.id}
                  for="USER_AVATAR"
                  image={user.avatar}
                  onChange={async () => {
                    await refetch()
                    onChange?.()
                  }}
                />
                <Stack flexGrow={1}>
                  <FormText name="newEmail" label="E-mail" type="email" required />
                  <FormText name="name" label="Name" required />
                </Stack>
              </Stack>
            </Form>
          </AccordionDetails>
        </Accordion>
      )}
      {isShown('password') && (
        <Accordion>
          <AccordionSummary>Password</AccordionSummary>
          <AccordionDetails>
            <Form
              submit="Update"
              schema={passwordSchema}
              onSubmit={async ({ newPassword, oldPassword }) => {
                await updatePassword({ variables: { input: { newPassword, oldPassword } } })
              }}
            >
              <Stack>
                <FormText name="oldPassword" label="Current password" required type="password" hidePasswordStrength />
                <FormText name="newPassword" label="New password" required type="password" />
                <FormText
                  required
                  type="password"
                  hidePasswordStrength
                  label="Repeat password"
                  name="repeatNewPassword"
                />
              </Stack>
            </Form>
          </AccordionDetails>
        </Accordion>
      )}
      {isShown('socials') && (
        <Accordion>
          <AccordionSummary>Socials</AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <SocialButton
                  icon={<img alt="TikTok" src="/images/logos/tiktok.svg" height={16} />}
                  name="TikTok"
                  color="#000"
                  linked
                />
              </Grid>
              <Grid item xs={6}>
                <SocialButton
                  icon={<img alt="Twitter" src="/images/logos/twitter.svg" height={16} />}
                  name="Twitter"
                  color="#1d9bf0"
                />
              </Grid>
              <Grid item xs={6}>
                <SocialButton
                  icon={<img alt="Instagram" src="/images/logos/instagram.svg" height={16} />}
                  name="Instagram"
                  color="#ff543e"
                />
              </Grid>
              <Grid item xs={6}>
                <SocialButton
                  icon={<img alt="Facebook" src="/images/logos/facebook.svg" height={16} />}
                  name="Facebook"
                  color="#0062e0"
                />
              </Grid>
              <Grid item xs={6}>
                <SocialButton
                  icon={<img alt="YouTube" src="/images/logos/youtube.svg" height={16} />}
                  name="YouTube"
                  color="#f61c0d"
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}
    </AccordionContext>
  )
}

type Section = 'information' | 'password' | 'socials'

type UpdateUserFormProps = {
  userId: string
  onChange?: () => void
  include?: Section[]
  exclude?: Section[]
}

export function UpdateUserForm(props: UpdateUserFormProps) {
  const query = useUserQuery({
    variables: { id: props.userId },
    notifyOnNetworkStatusChange: false,
  })

  return (
    <QueryLoader query={query} loading={Loading} render={(renderProps) => <Render {...props} {...renderProps} />} />
  )
}
