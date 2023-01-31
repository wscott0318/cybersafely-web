import { LoadingButton } from '@mui/lab'
import { Divider, Link, Stack, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { z } from 'zod'
import { CoverLayout } from '../../../components/common/CoverLayout'
import { NextLink } from '../../../components/common/NextLink'
import { checkPasswordStrength, PasswordStrength } from '../../../components/common/PasswordStrength'
import { useForm } from '../../../helpers/form'
import { useRegisterMutation } from '../../../types/graphql'

const schema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(4)
      .refine((password) => checkPasswordStrength(password) > 50, 'Password is too weak'),
    repeatPassword: z.string(),
    user: z.object({
      name: z.string().min(4),
    }),
    team: z.object({
      name: z.string().min(4),
    }),
  })
  .superRefine(({ password, repeatPassword }, ctx) => {
    if (password !== repeatPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['repeatPassword'],
        message: "The passwords don't match",
      })
    }
  })

export default function Register() {
  const router = useRouter()
  const form = useForm(schema)

  const [register, { loading }] = useRegisterMutation({
    onCompleted() {
      router.push('/auth/login')
    },
  })

  return (
    <CoverLayout>
      <form
        onSubmit={form.onSubmit((variables) => {
          register({ variables })
        })}
      >
        <Stack spacing={4}>
          <Typography variant="h4">Register</Typography>
          <TextField
            required
            label="Name"
            size="medium"
            variant="outlined"
            error={form.hasError('user.name')}
            value={form.value.user?.name ?? ''}
            helperText={form.getError('user.name')}
            onChange={(e) => form.onChange({ user: { name: e.target.value } })}
          />
          <TextField
            required
            type="email"
            size="medium"
            label="E-mail"
            variant="outlined"
            error={form.hasError('email')}
            value={form.value.email ?? ''}
            helperText={form.getError('email')}
            onChange={(e) => form.onChange({ email: e.target.value })}
          />
          <TextField
            required
            size="medium"
            type="password"
            label="Password"
            variant="outlined"
            error={form.hasError('password')}
            value={form.value.password ?? ''}
            helperText={form.getError('password')}
            onChange={(e) => form.onChange({ password: e.target.value })}
            InputProps={{ endAdornment: <PasswordStrength password={form.value.password} /> }}
          />
          <TextField
            required
            size="medium"
            type="password"
            label="Repeat Password"
            variant="outlined"
            error={form.hasError('repeatPassword')}
            value={form.value.repeatPassword ?? ''}
            helperText={form.getError('repeatPassword')}
            onChange={(e) => form.onChange({ repeatPassword: e.target.value })}
          />
          <TextField
            required
            size="medium"
            label="Team Name"
            variant="outlined"
            error={form.hasError('team.name')}
            value={form.value.team?.name ?? ''}
            helperText={form.getError('team.name')}
            onChange={(e) => form.onChange({ team: { name: e.target.value } })}
          />
          <LoadingButton type="submit" loading={loading} size="large">
            Register
          </LoadingButton>
          <Divider />
          <Typography>
            Already have an account?{' '}
            <NextLink href="/auth/login">
              <Link>Sign in</Link>
            </NextLink>
          </Typography>
        </Stack>
      </form>
    </CoverLayout>
  )
}
