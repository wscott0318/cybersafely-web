import { LoadingButton } from '@mui/lab'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Skeleton,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback, useMemo, useState } from 'react'
import { z } from 'zod'
import { addIssue } from '../../helpers/zod'
import {
  MyUserQuery,
  SocialFragmentFragment,
  SocialNameEnum,
  namedOperations,
  useAuthWithSocialMutation,
  useMyUserQuery,
  useNotificationSettingsQuery,
  useRemoveSocialMutation,
  useUpdateEmailSettingsMutation,
  useUpdatePasswordMutation,
  useUpdateUserMutation,
  useValidatePhoneNumberMutation,
} from '../../schema'
import { useAlert } from '../../utils/context/alert'
import { SocialConfig } from '../../utils/social'
import { AccordionContext } from '../common/AccordionContext'
import { checkPasswordStrength } from '../common/PasswordStrength'
import { QueryLoader, QueryLoaderRenderProps } from '../common/QueryLoader'
import { SeverityImage } from '../common/SeverityImage'
import { SocialButton } from '../common/SocialButton'
import { Form } from '../common/form/Form'
import { FormAvatar } from '../common/form/FormAvatar'
import { FormText } from '../common/form/FormText'

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
        <Skeleton variant="rounded" height={56} />
      </Stack>
    </Stack>
  )
}

const accountSchema = z.object({
  newEmail: z.string().email(),
  name: z.string().min(4),
  newPhoneNumber: z.string(),
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

export function SocialButtonConfig({
  name,
  user,
  refetch,
  onlyButton,
}: {
  name: keyof typeof SocialConfig
  user: { platforms: SocialFragmentFragment[] }
  refetch: () => void
  onlyButton?: boolean
}) {
  const [authWithSocial] = useAuthWithSocialMutation()
  const [removeSocial] = useRemoveSocialMutation({
    onCompleted: () => {
      refetch()
    },
  })

  const social = useMemo(() => {
    switch (name) {
      case 'TWITTER':
        return user.platforms.find((e) => e.__typename === 'Twitter')
      case 'FACEBOOK':
        return user.platforms.find((e) => e.__typename === 'Facebook')
      case 'INSTAGRAM':
        return user.platforms.find((e) => e.__typename === 'Instagram')
      case 'TIKTOK':
        return user.platforms.find((e) => e.__typename === 'TikTok')
    }
  }, [name, user])

  return onlyButton ? (
    <Button
      variant="outlined"
      color={!!social ? 'primary' : 'success'}
      onClick={async () => {
        if (!!social) {
          await removeSocial({ variables: { name: name as SocialNameEnum } })
        } else {
          await authWithSocial({ variables: { name: name as SocialNameEnum } }).then(({ data }) => {
            document.location = data!.authWithSocial
          })
        }
      }}
    >
      {!!social ? 'Disconnect' : 'Connect'}
    </Button>
  ) : (
    <SocialButton
      {...SocialConfig[name]}
      linked={!!social}
      username={social?.username}
      onLink={() => {
        return authWithSocial({ variables: { name: name as SocialNameEnum } }).then(({ data }) => {
          return data!.authWithSocial
        })
      }}
      onUnlink={async () => {
        await removeSocial({ variables: { name: name as SocialNameEnum } })
      }}
    />
  )
}

function VerifyPhoneNumber({ onSubmit }: { onSubmit: () => void }) {
  const [token, setToken] = useState('')

  const [verify, { loading }] = useValidatePhoneNumberMutation({
    variables: { token },
    onCompleted: () => {
      onSubmit()
    },
  })

  return (
    <Stack>
      <Box>
        <Typography variant="h5">We've sent an SMS</Typography>
        <Typography>Enter below the verification code sent via SMS</Typography>
      </Box>
      <TextField label="Verification Code" autoFocus value={token} onChange={(e) => setToken(e.target.value)} />
      <LoadingButton loading={loading} onClick={() => verify()}>
        Verify
      </LoadingButton>
    </Stack>
  )
}

function Render({
  onChange,
  include,
  exclude,
  data: { user },
  query: { refetch },
  index,
  setIndex,
}: UpdateUserFormProps &
  QueryLoaderRenderProps<MyUserQuery> & {
    index: number | undefined
    setIndex: (index: number | undefined) => void
  }) {
  const { pushAlert } = useAlert()

  const [updateUser] = useUpdateUserMutation()
  const [updatePassword] = useUpdatePasswordMutation()

  const { data: settingsData } = useNotificationSettingsQuery()
  const [updateEmailSettings] = useUpdateEmailSettingsMutation({
    refetchQueries: [namedOperations.Query.notificationSettings],
  })

  const isShown = useCallback(
    (section: Section) => {
      if (include && include.length > 0) {
        return include.includes(section)
      }
      if (exclude && exclude.length > 0) {
        return !exclude.includes(section)
      }
      return true
    },
    [include, exclude]
  )

  return (
    <AccordionContext title="Profile" index={index} setIndex={setIndex}>
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
                newPhoneNumber: user.phoneNumber ?? '',
              }}
              onSubmit={async (data, input) => {
                await updateUser({
                  variables: {
                    id: user.id,
                    input: {
                      ...input,
                      newPhoneNumber: input.newPhoneNumber === '' ? null : input.newPhoneNumber,
                    },
                  },
                })

                await refetch()
                onChange?.()

                if (!!input.newEmail) {
                  pushAlert({
                    type: 'alert',
                    title: 'Verify E-mail',
                    message: 'Please check your inbox and follow the instructions',
                  })
                }

                if (!!input.newPhoneNumber) {
                  pushAlert({
                    title: '',
                    type: 'custom',
                    content: VerifyPhoneNumber,
                    result: async () => {
                      await refetch()
                      onChange?.()
                    },
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
                  <FormText name="newPhoneNumber" label="Phone Number" type="phone" />
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
            <Stack spacing={1}>
              <SocialButtonConfig name="TWITTER" user={user} refetch={refetch} />
              <SocialButtonConfig name="FACEBOOK" user={user} refetch={refetch} />
              <SocialButtonConfig name="INSTAGRAM" user={user} refetch={refetch} />
              <SocialButtonConfig name="TIKTOK" user={user} refetch={refetch} />
              {/* <SocialButtonConfig name="YOUTUBE" user={user} refetch={refetch} /> */}
            </Stack>
          </AccordionDetails>
        </Accordion>
      )}
      {isShown('notification-settings') && (
        <Accordion>
          <AccordionSummary>Notification Settings</AccordionSummary>
          <AccordionDetails>
            <Stack spacing={1}>
              <Typography>Email</Typography>
              <FormGroup>
                <FormControlLabel
                  label={
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <SeverityImage severity="NONE" size={24} />
                      <Typography>Send no issue posts email</Typography>
                    </Stack>
                  }
                  control={
                    <Switch
                      checked={settingsData?.notificationSettings.receivePostNoneSeverityEmail ?? false}
                      onChange={(_, receivePostNoneSeverityEmail) => {
                        updateEmailSettings({ variables: { input: { receivePostNoneSeverityEmail } } })
                      }}
                    />
                  }
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  label={
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <SeverityImage severity="LOW" size={24} />
                      <Typography>Send warning posts email</Typography>
                    </Stack>
                  }
                  control={
                    <Switch
                      checked={settingsData?.notificationSettings.receivePostLowSeverityEmail ?? false}
                      onChange={(_, receivePostLowSeverityEmail) => {
                        updateEmailSettings({ variables: { input: { receivePostLowSeverityEmail } } })
                      }}
                    />
                  }
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  label={
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <SeverityImage severity="HIGH" size={24} />
                      <Typography>Send critical posts email</Typography>
                    </Stack>
                  }
                  control={
                    <Switch
                      checked={settingsData?.notificationSettings.receivePostHighSeverityEmail ?? false}
                      onChange={(_, receivePostHighSeverityEmail) => {
                        updateEmailSettings({ variables: { input: { receivePostHighSeverityEmail } } })
                      }}
                    />
                  }
                />
              </FormGroup>
              <Typography>SMS</Typography>
              <FormGroup>
                <FormControlLabel
                  label={
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <SeverityImage severity="NONE" size={24} />
                      <Typography>Send no issue posts SMS</Typography>
                    </Stack>
                  }
                  control={
                    <Switch
                      checked={settingsData?.notificationSettings.receivePostNoneSeveritySMS ?? false}
                      onChange={(_, receivePostNoneSeveritySMS) => {
                        updateEmailSettings({ variables: { input: { receivePostNoneSeveritySMS } } })
                      }}
                    />
                  }
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  label={
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <SeverityImage severity="LOW" size={24} />
                      <Typography>Send warning posts SMS</Typography>
                    </Stack>
                  }
                  control={
                    <Switch
                      checked={settingsData?.notificationSettings.receivePostLowSeveritySMS ?? false}
                      onChange={(_, receivePostLowSeveritySMS) => {
                        updateEmailSettings({ variables: { input: { receivePostLowSeveritySMS } } })
                      }}
                    />
                  }
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  label={
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <SeverityImage severity="HIGH" size={24} />
                      <Typography>Send critical posts SMS</Typography>
                    </Stack>
                  }
                  control={
                    <Switch
                      checked={settingsData?.notificationSettings.receivePostHighSeveritySMS ?? false}
                      onChange={(_, receivePostHighSeveritySMS) => {
                        updateEmailSettings({ variables: { input: { receivePostHighSeveritySMS } } })
                      }}
                    />
                  }
                />
              </FormGroup>
            </Stack>
          </AccordionDetails>
        </Accordion>
      )}
    </AccordionContext>
  )
}

export type Section = 'information' | 'password' | 'socials' | 'notification-settings'

type UpdateUserFormProps = {
  userId: string
  onChange?: () => void
  include?: Section[]
  exclude?: Section[]
}

export function UpdateUserForm(props: UpdateUserFormProps) {
  const router = useRouter()

  const index = parseInt(router.query.index as string)

  const query = useMyUserQuery({
    variables: { id: props.userId },
    notifyOnNetworkStatusChange: false,
  })

  return (
    <QueryLoader
      query={query}
      loading={Loading}
      render={(renderProps) => (
        <Render
          {...props}
          {...renderProps}
          index={index}
          setIndex={(index) => {
            router.query.index = String(index)
            router.replace(router)
          }}
        />
      )}
    />
  )
}
