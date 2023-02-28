import { FormEvent, useCallback, useState } from 'react'
import { z, ZodError } from 'zod'
import { checkPasswordStrength } from '../components/common/PasswordStrength'

export function setValueForKeyPath(keyPath: string, value: any, data: any) {
  if (typeof value === 'undefined') {
    return data
  }

  let result = data

  const keys = keyPath.split('.')
  let index = keys.length - 1

  for (const key of keys) {
    if (index === 0) {
      result[key] = value
    } else if (typeof result[key] === 'object' && result[key] !== null) {
      result = result[key]
    } else {
      result[key] = {}
      result = result[key]
    }

    index -= 1
  }

  return data
}

export function valueOrDefault<T>(value: T, defaultValue: T | undefined) {
  if (typeof value === 'undefined') return defaultValue
  return value
}

export function toggleGroup<T>(shown: boolean | undefined, value: T) {
  if (shown === true) return value
  if (shown === false) return null
}

export function addIssue(name: string, message: string, ctx: z.RefinementCtx) {
  ctx.addIssue({
    message,
    code: 'custom',
    path: name.split('.'),
  })
}

export const z_image = z.string().nullable().optional()
export const z_some_string = z.string().min(4)
export const z_email = z.string().email()
export const z_password = z
  .string()
  .min(4)
  .refine((password) => checkPasswordStrength(password) > 50, 'Password is too weak')

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
