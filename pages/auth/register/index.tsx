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
import { useCreateAddressMutation, useCreateSchoolMutation, useRegisterWithEmailMutation } from '../../../schema'
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

function RegisterStep4(props: { data: Schema }) {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [accept, setAccept] = useState(false)

  const [registerWithEmail] = useRegisterWithEmailMutation()
  const [createSchool] = useCreateSchoolMutation()
  const [createAddress] = useCreateAddressMutation()

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
        onClick={async () => {
          try {
            setLoading(true)

            const { data } = await registerWithEmail({
              variables: {
                input: {
                  email: props.data.step1.email,
                  password: props.data.step1.password,
                  name: props.data.step1.name,
                },
              },
            })

            const userId = data!.registerWithEmail.user.id

            StorageManager.set('token', data!.registerWithEmail.token)
            StorageManager.set('userId', userId)

            const { data: schoolData } = await createSchool({
              variables: {
                input: {
                  userId,
                  name: props.data.step2.name,
                  phone: props.data.step2.phone,
                },
              },
            })

            await createAddress({
              variables: {
                schoolId: schoolData!.createSchool.id,
                input: {
                  street: props.data.step3.street,
                  city: props.data.step3.city,
                  state: props.data.step3.state,
                  zip: props.data.step3.zip,
                },
              },
            })

            router.push('/dashboard')
          } finally {
            setLoading(false)
          }
        }}
      >
        Register
      </LoadingButton>
    </Stack>
  )
}

type Schema = {
  step1: z.infer<typeof schemaStep1>
  step2: z.infer<typeof schemaStep2>
  step3: z.infer<typeof schemaStep3>
}

export default function Register() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<Partial<Schema>>({})

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
                onNext={async (step1) => {
                  setData((data) => ({ ...data, step1 }))
                  setStep((step) => step + 1)
                }}
              />
            </StepContent>
          </Step>
          <Step>
            <StepButton onClick={() => onClickStep(1)}>School</StepButton>
            <StepContent TransitionProps={{ unmountOnExit: false }}>
              <RegisterStep2
                onNext={async (step2) => {
                  setData((data) => ({ ...data, step2 }))
                  setStep((step) => step + 1)
                }}
              />
            </StepContent>
          </Step>
          <Step>
            <StepButton onClick={() => onClickStep(2)}>Address</StepButton>
            <StepContent TransitionProps={{ unmountOnExit: false }}>
              <RegisterStep3
                onNext={async (step3) => {
                  setData((data) => ({ ...data, step3 }))
                  setStep((step) => step + 1)
                }}
              />
            </StepContent>
          </Step>
          <Step>
            <StepButton onClick={() => onClickStep(3)}>Finish</StepButton>
            <StepContent TransitionProps={{ unmountOnExit: false }}>
              <RegisterStep4 data={data as Schema} />
            </StepContent>
          </Step>
        </Stepper>
      </NavigationView>
    </CoverLayout>
  )
}
