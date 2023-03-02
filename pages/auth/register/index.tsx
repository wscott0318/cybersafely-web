import { LoadingButton } from '@mui/lab'
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Link,
  Stack,
  Step,
  StepButton,
  StepContent,
  Stepper,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { z } from 'zod'
import { CoverLayout } from '../../../components/common/CoverLayout'
import { Form } from '../../../components/common/form/Form'
import { FormText } from '../../../components/common/form/FormText'
import { NavigationView } from '../../../components/common/NavigationView'
import { NextLink } from '../../../components/common/NextLink'
import { checkPasswordStrength } from '../../../components/common/PasswordStrength'
import { addIssue } from '../../../helpers/zod'
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
      addIssue('repeatNewPassword', "The passwords don't match", ctx)
    }
  })

function RegisterStep1(props: { onNext: (data: z.infer<typeof schemaStep1>) => void }) {
  return (
    <Form schema={schemaStep1} onSubmit={(data) => props.onNext(data)} submit="Next">
      <FormText name="name" label="Name" required />
      <FormText name="email" label="E-mail" type="email" required />
      <FormText name="password" label="Password" type="password" required />
      <FormText name="repeatPassword" label="Repeat Password" type="password" required hidePasswordStrength />
    </Form>
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
  return (
    <Form schema={schemaStep2} onSubmit={(data) => props.onNext(data)} submit="Next">
      <FormText name="name" label="Name" required />
      <FormText name="phone" label="Phone" type="phone" />
    </Form>
  )
}

const schemaStep3 = z.object({
  street: z.string().min(4),
  city: z.string().min(4),
  state: z.string().min(4),
  zip: z.string().min(4),
})

function RegisterStep3(props: { onNext: (data: z.infer<typeof schemaStep3>) => void }) {
  return (
    <Form schema={schemaStep3} onSubmit={(data) => props.onNext(data)} submit="Next">
      <FormText name="street" label="Street" />
      <FormText name="city" label="City" />
      <FormText name="state" label="State" />
      <FormText name="zip" label="ZIP" />
    </Form>
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
