import { LoadingButton } from '@mui/lab'
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Link,
  Stack,
  Step,
  StepButton,
  StepContent,
  Stepper,
  TextField,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { z } from 'zod'
import { CoverLayout } from '../../../components/common/CoverLayout'
import { NavigationView } from '../../../components/common/NavigationView'
import { NextLink } from '../../../components/common/NextLink'
import { checkPasswordStrength, PasswordStrength } from '../../../components/common/PasswordStrength'
import { useForm } from '../../../helpers/form'
import { RegisterMutationVariables, useRegisterMutation } from '../../../types/graphql'
import { StorageManager } from '../../../utils/storage'

const schemaStep1 = z
  .object({
    name: z.string().min(4),
    email: z.string().email(),
    password: z
      .string()
      .min(4)
      .refine((password) => checkPasswordStrength(password) > 50, 'Password is too weak'),
    repeatPassword: z.string(),
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

function RegisterStep1(props: { onNext: (data: z.infer<typeof schemaStep1>) => void }) {
  const form = useForm(schemaStep1)

  return (
    <form onSubmit={form.onSubmit(props.onNext)}>
      <Stack>
        <TextField
          required
          label="Name"
          size="medium"
          variant="outlined"
          error={form.hasError('name')}
          value={form.value.name ?? ''}
          helperText={form.getError('name')}
          onChange={(e) => form.onChange('name', e.target.value)}
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
          onChange={(e) => form.onChange('email', e.target.value)}
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
          onChange={(e) => form.onChange('password', e.target.value)}
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
          onChange={(e) => form.onChange('repeatPassword', e.target.value)}
        />
        <Button type="submit" size="large">
          Next
        </Button>
      </Stack>
    </form>
  )
}

const schemaStep2 = z.object({
  name: z.string().min(4),
  phone: z
    .union([z.string().min(4), z.string().length(0)])
    .optional()
    .transform((e) => (e === '' ? null : e)),
})

function RegisterStep2(props: { onNext: (data: z.infer<typeof schemaStep2>) => void }) {
  const form = useForm(schemaStep2)

  return (
    <form onSubmit={form.onSubmit(props.onNext)}>
      <Stack>
        <TextField
          required
          label="Name"
          size="medium"
          variant="outlined"
          error={form.hasError('name')}
          value={form.value.name ?? ''}
          helperText={form.getError('name')}
          onChange={(e) => form.onChange('name', e.target.value)}
        />
        <TextField
          label="Phone"
          size="medium"
          variant="outlined"
          error={form.hasError('phone')}
          value={form.value.phone ?? ''}
          helperText={form.getError('phone')}
          onChange={(e) => form.onChange('phone', e.target.value)}
        />
        <Button type="submit" size="large">
          Next
        </Button>
      </Stack>
    </form>
  )
}

const schemaStep3 = z.object({
  street: z.string().min(4),
  city: z.string().min(4),
  state: z.string().min(4),
  zip: z.string().min(4),
})

function RegisterStep3(props: { onNext: (data: z.infer<typeof schemaStep3>) => void }) {
  const form = useForm(schemaStep3)

  return (
    <form onSubmit={form.onSubmit(props.onNext)}>
      <Stack>
        <TextField
          required
          label="Street"
          size="medium"
          variant="outlined"
          error={form.hasError('street')}
          value={form.value.street ?? ''}
          helperText={form.getError('street')}
          onChange={(e) => form.onChange('street', e.target.value)}
        />
        <TextField
          required
          label="City"
          size="medium"
          variant="outlined"
          error={form.hasError('city')}
          value={form.value.city ?? ''}
          helperText={form.getError('city')}
          onChange={(e) => form.onChange('city', e.target.value)}
        />
        <TextField
          required
          label="State"
          size="medium"
          variant="outlined"
          error={form.hasError('state')}
          value={form.value.state ?? ''}
          helperText={form.getError('state')}
          onChange={(e) => form.onChange('state', e.target.value)}
        />
        <TextField
          required
          label="ZIP"
          size="medium"
          variant="outlined"
          error={form.hasError('zip')}
          value={form.value.zip ?? ''}
          helperText={form.getError('zip')}
          onChange={(e) => form.onChange('zip', e.target.value)}
        />
        <Button type="submit" size="large">
          Next
        </Button>
      </Stack>
    </form>
  )
}

function RegisterStep4(props: { data: RegisterMutationVariables }) {
  const router = useRouter()

  const [accept, setAccept] = useState(false)

  const [register, { loading }] = useRegisterMutation({
    onCompleted: async (data, options) => {
      const { token } = data.register
      StorageManager.set('token', token)

      await options?.client?.clearStore()

      router.push('/dashboard')
    },
  })

  return (
    <Stack>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={accept} onChange={(_, accept) => setAccept(accept)} />}
          label={
            <Typography>
              I accept the{' '}
              <NextLink href="/">
                <Link>Terms and Conditions</Link>
              </NextLink>
              .
            </Typography>
          }
        />
      </FormGroup>
      <LoadingButton
        size="large"
        loading={loading}
        disabled={!accept}
        onClick={() => {
          register({ variables: props.data })
        }}
      >
        Register
      </LoadingButton>
    </Stack>
  )
}

export default function Register() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<Partial<RegisterMutationVariables>>({})

  const onClickStep = useCallback(
    (index: number) => {
      if (index < step) {
        setStep(index)
      }
    },
    [step]
  )

  return (
    <CoverLayout>
      <NavigationView title="Register" back="/auth/login">
        <Stepper activeStep={step} orientation="vertical" nonLinear>
          <Step>
            <StepButton onClick={() => onClickStep(0)}>Credentials</StepButton>
            <StepContent TransitionProps={{ unmountOnExit: false }}>
              <RegisterStep1
                onNext={({ email, password, name }) => {
                  setData((data) => ({ ...data, email, password, user: { name } }))
                  setStep((step) => step + 1)
                }}
              />
            </StepContent>
          </Step>
          <Step>
            <StepButton onClick={() => onClickStep(1)}>School</StepButton>
            <StepContent TransitionProps={{ unmountOnExit: false }}>
              <RegisterStep2
                onNext={({ name, phone }) => {
                  setData((data) => ({ ...data, school: { name, phone } }))
                  setStep((step) => step + 1)
                }}
              />
            </StepContent>
          </Step>
          <Step>
            <StepButton onClick={() => onClickStep(2)}>Address</StepButton>
            <StepContent TransitionProps={{ unmountOnExit: false }}>
              <RegisterStep3
                onNext={({ street, city, state, zip }) => {
                  setData((data) => ({ ...data, school: { ...data.school!, address: { street, city, state, zip } } }))
                  setStep((step) => step + 1)
                }}
              />
            </StepContent>
          </Step>
          <Step>
            <StepButton onClick={() => onClickStep(3)}>Finish</StepButton>
            <StepContent TransitionProps={{ unmountOnExit: false }}>
              <RegisterStep4 data={data as RegisterMutationVariables} />
            </StepContent>
          </Step>
        </Stepper>
      </NavigationView>
    </CoverLayout>
  )
}
