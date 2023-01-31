import { FormEvent, useCallback, useState } from 'react'
import { z, ZodError } from 'zod'

export function useForm<TSchema extends {}>(schema: z.Schema<TSchema>, initialValue?: Partial<TSchema>) {
  const [value, setValue] = useState<Partial<TSchema>>(initialValue ?? {})
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
    (callback: (value: TSchema, deltaValue: Partial<TSchema>) => void) => {
      setErrors(undefined)

      try {
        const newValue = schema.parse(value)

        const deltaValue: Partial<TSchema> = {}

        if (initialValue) {
          Object.keys(newValue).forEach((_key) => {
            const key = _key as keyof TSchema
            if (initialValue[key] !== newValue[key]) {
              deltaValue[key] = newValue[key]
            }
          })
        }

        callback(newValue, deltaValue)
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
    [schema, value, initialValue]
  )

  const onSubmit = useCallback(
    (callback: (value: TSchema, deltaValue: Partial<TSchema>) => void) => {
      return function onSubmitWrapper(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        didSubmit(callback)
      }
    },
    [didSubmit]
  )

  const clear = useCallback(() => {
    setValue({})
  }, [])

  return {
    value,
    hasError,
    getError,
    onChange,
    onSubmit,
    didSubmit,
    clear,
  }
}
