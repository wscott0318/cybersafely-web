import { LoadingButton } from '@mui/lab'
import { useForm } from './Form'

type FormButtonProps = {
  children?: React.ReactNode
}

export function FormButton(props: FormButtonProps) {
  const { loading } = useForm()

  return (
    <LoadingButton type="submit" loading={loading}>
      {props.children ?? 'Submit'}
    </LoadingButton>
  )
}
