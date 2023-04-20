import ArrowIcon from '@mui/icons-material/ArrowForwardOutlined'
import CheckIcon from '@mui/icons-material/CheckCircle'
import UploadIcon from '@mui/icons-material/UploadOutlined'
import { Button, Paper, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material'
import { useState } from 'react'
import { useFilePicker } from '../../utils/upload'
import { IMPORT_ACCEPT, InviteStudentAndParentTableForm } from '../forms/InviteStudentAndParentTableForm'

type ImportStudentsModalProps = {
  schoolId: string
  onSubmit: () => void
}

type ImportStepProps = {
  onNext: () => void
}

function StepOne(props: ImportStudentsModalProps & ImportStepProps) {
  return (
    <Stack alignItems="center" spacing={0}>
      <Typography variant="h6">Import Students and Parents From File</Typography>
      <Typography>
        In the next step select a .csv or .xlxs file to import students from. You need next to select which columns to
        use for the import.
      </Typography>
      <Button onClick={props.onNext} endIcon={<ArrowIcon />} sx={{ mt: 2 }}>
        Next
      </Button>
    </Stack>
  )
}

function StepTwo({ schoolId, onNext }: ImportStudentsModalProps & ImportStepProps) {
  const { pick } = useFilePicker()

  const [file, setFile] = useState<File>()

  if (!file) {
    return (
      <Paper sx={{ p: 4, bgcolor: 'background.default' }}>
        <Stack alignItems="center">
          <Typography>Click the button below to select a file</Typography>
          <Button
            startIcon={<UploadIcon />}
            onClick={async () => {
              const file = await pick(IMPORT_ACCEPT)
              if (file) setFile(file)
            }}
          >
            Upload a File...
          </Button>
        </Stack>
      </Paper>
    )
  }

  return (
    <InviteStudentAndParentTableForm
      file={file}
      onSubmit={onNext}
      schoolId={schoolId}
      onClearFile={() => setFile(undefined)}
    />
  )
}

function StepThree({ onNext }: ImportStudentsModalProps & ImportStepProps) {
  return (
    <Stack alignItems="center" spacing={0}>
      <CheckIcon color="success" sx={{ fontSize: '3rem' }} />
      <Typography variant="h5" mt={1}>
        Success
      </Typography>
      <Typography>The import was successful</Typography>
      <Button variant="text" onClick={onNext} sx={{ mt: 2 }}>
        Close
      </Button>
    </Stack>
  )
}

export function ImportStudentsModal(props: ImportStudentsModalProps) {
  const [step, setStep] = useState(0)

  return (
    <Stack spacing={4}>
      <Stepper activeStep={step}>
        <Step>
          <StepLabel>Step 1</StepLabel>
        </Step>
        <Step>
          <StepLabel>Step 2</StepLabel>
        </Step>
        <Step>
          <StepLabel>Step 3</StepLabel>
        </Step>
      </Stepper>
      {step === 0 && <StepOne {...props} onNext={() => setStep((step) => step + 1)} />}
      {step === 1 && <StepTwo {...props} onNext={() => setStep((step) => step + 1)} />}
      {step === 2 && <StepThree {...props} onNext={() => props.onSubmit()} />}
    </Stack>
  )
}
