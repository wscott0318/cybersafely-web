import { FormEvent, useCallback, useState } from 'react'
import { z, ZodError } from 'zod'

export function useForm<TSchema extends {}>(schema: z.Schema<TSchema>, initialValue?: Partial<TSchema>) {
  const [value, setValue] = useState<Partial<TSchema>>(initialValue ?? {})
  const [errors, setErrors] = useState<Record<keyof TSchema, string>>()

  const hasError = useCallback(
    (key: keyof TSchema) => {
      return !!errors && key in errors
    },
    [errors]
  )

  const getError = useCallback(
    (key: keyof TSchema) => {
      return errors && errors[key]
    },
    [errors]
  )

  const onChange = useCallback(<K extends keyof TSchema>(key: K, newValue: TSchema[K]) => {
    setValue((value) => ({ ...value, [key]: newValue }))
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
              const key = curr.path[0]
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
