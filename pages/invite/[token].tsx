import { Avatar, Box, Button, CircularProgress, Stack, Typography } from '@mui/material'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { z } from 'zod'
import { CoverLayout } from '../../components/common/CoverLayout'
import { checkPasswordStrength } from '../../components/common/PasswordStrength'
import { Form } from '../../components/common/form/Form'
import { FormText } from '../../components/common/form/FormText'
import { Config } from '../../helpers/config'
import { useInvitedRoleQuery, useRespondToInvitedRoleMutation } from '../../schema'
import { useAlert } from '../../utils/context/alert'

const schema = z.object({
  name: z.string().nullish(),
  password: z
    .string()
    .nullish()
    .refine((password) => !password || checkPasswordStrength(password) > 50, 'Password is too weak'),
})

type Props = {
  token: string
}

function Invite({ token }: Props) {
  const router = useRouter()

  const { pushAlert, pushError } = useAlert()

  const { data } = useInvitedRoleQuery({
    variables: { token },
    onError: (error) => {
      pushError(error)
    },
  })

  const [respond] = useRespondToInvitedRoleMutation({
    onError: (error) => {
      pushError(error)
    },
  })

  if (!data) {
    return (
      <Stack minHeight="100vh" alignItems="center" justifyContent="center">
        <CircularProgress />
      </Stack>
    )
  }

  const { type, schoolName, schoolLogoURL, isNewUser } = data.invitedRole

  return (
    <CoverLayout>
      <Stack>
        <Form
          schema={schema}
          submit="Accept Invitation"
          onSubmit={async ({ name, password }) => {
            await respond({ variables: { token, accept: true, name, password } })
            router.push('/auth/login')
          }}
        >
          <Typography variant="h4">Invitation</Typography>
          {type === 'STAFF' && <Typography>You are invited to join as staff of {Config.app.shortName}</Typography>}
          {type === 'PARENT' && <Typography>You are invited to join as a parent</Typography>}
          {['ADMIN', 'COACH', 'STUDENT'].includes(type) && !!schoolName && (
            <Stack direction="row" alignItems="center">
              <Avatar src={schoolLogoURL ?? undefined} sx={{ width: 48, height: 48 }}>
                {schoolName[0].toUpperCase()}
              </Avatar>
              <Box flexGrow={1}>
                <Typography>You are invited to join</Typography>
                <Typography variant="h6" mt={-0.5}>
                  {schoolName}
                </Typography>
              </Box>
            </Stack>
          )}
          <Stack>
            {isNewUser && (
              <>
                <FormText name="name" label="Name" required />
                <FormText name="password" label="Password" type="password" required />
                <Typography variant="body2" color="text.secondary">
                  * Enter a name and a password to create your login credentials
                </Typography>
              </>
            )}
          </Stack>
        </Form>
        <Button
          color="error"
          variant="text"
          onClick={() => {
            pushAlert({
              type: 'confirm',
              title: 'Decline Invitation',
              message: 'Are you sure you want to decline the invitation?',
              confirm: async () => {
                await respond({ variables: { token, accept: false } })
                router.push('/')
              },
            })
          }}
        >
          Decline Invitation
        </Button>
      </Stack>
    </CoverLayout>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const token = ctx.params!.token as string
  return { props: { token } }
}

export default Invite
