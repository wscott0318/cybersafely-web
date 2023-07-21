import { zodResolver } from '@hookform/resolvers/zod'
import { LoadingButton } from '@mui/lab'
import { ButtonProps, Stack } from '@mui/material'
import { useCallback, useState } from 'react'
import { DefaultValues, FieldValues, FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

type FormProps<T> = {
  schema: z.Schema<T>
  children: React.ReactNode
  submit?: string
  onSubmit: (data: T, dirty: Partial<T>) => void | Promise<void>
  defaultValues?: Partial<T>
  buttonProps?: ButtonProps
}

export function Form<T extends {}>(props: FormProps<T>) {
  const methods = useForm({
    resolver: zodResolver(props.schema),
    defaultValues: props.defaultValues as DefaultValues<T>,
  })

  const [loading, setLoading] = useState(false)

  const onSubmit = useCallback(
    async (data: FieldValues) => {
      const { defaultValues } = methods.formState

      const dirty = Object.fromEntries(
        Object.entries(data).filter(([key]) => defaultValues && (defaultValues as any)[key] !== data[key])
      )

      try {
        setLoading(true)
        await props.onSubmit(data as T, dirty as Partial<T>)
      } finally {
        setLoading(false)
      }
    },
    [methods.formState, props.onSubmit]
  )

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack>
          {props.children}
          <LoadingButton {...props.buttonProps} loading={loading} type="submit">
            {props.submit ?? 'Submit'}
          </LoadingButton>
        </Stack>
      </form>
    </FormProvider>
  )
}
