import { FormEvent, useCallback, useState } from 'react'
import { z, ZodError } from 'zod'

export function useForm<TSchema extends {}>(schema: z.Schema<TSchema>) {
  const [value, setValue] = useState<Partial<TSchema>>({})
  const [errors, setErrors] = useState<Record<string, string>>()

  const hasError = useCallback(
    (key: string) => {
      return !!errors && key in errors
    },
    [errors]
  )

  const getError = useCallback(
    (key: string) => {
      return errors && errors[key]
    },
    [errors]
  )

  const onChange = useCallback((newValue: Partial<TSchema>) => {
    // TODO: Deep merge
    setValue((value) => ({ ...value, ...newValue }))
  }, [])

  const didSubmit = useCallback(
    (callback: (value: TSchema) => void) => {
      setErrors(undefined)

      try {
        const newValue = schema.parse(value)
        callback(newValue)
      } catch (error) {
        if (error instanceof ZodError) {
          setErrors(
            error.errors.reduce<any>((prev, curr) => {
              const key = curr.path.map((e) => String(e)).join('.')
              prev[key] = curr.message
              return prev
            }, {})
          )
        }
      }
    },
    [schema, value]
  )

  const onSubmit = useCallback(
    (callback: (value: TSchema) => void) => {
      return function onSubmitWrapper(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        didSubmit(callback)
      }
    },
    [didSubmit]
  )

  return {
    value,
    hasError,
    getError,
    onChange,
    onSubmit,
    didSubmit,
  }
}
