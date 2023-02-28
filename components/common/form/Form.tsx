import React, {
  createContext,
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'
import { z } from 'zod'
import { setValueForKeyPath, valueOrDefault } from '../../../helpers/form'
import { useCallbackRef } from '../../../helpers/hooks'

export const FORM_ERROR_KEY = '_form'

type Maybe<T> = T | undefined
type MaybePromise<T = void> = T | Promise<T>

type FormContext = {
  loading: boolean
  errors: Record<string, any>
  values: Record<string, any>
  defaultValues: Record<string, any>
  setValue: (name: string, value: any) => void
  setDefaultValue: (name: string, value: any) => void
  addChangeListener: (name: string, callback: () => void) => () => void
  addBeforeSubmitListener: (name: string, callback: () => MaybePromise<void | (() => MaybePromise)>) => () => void
}

const FormContext = createContext<FormContext | null>(null)

type FormProps<T> = {
  children: React.ReactNode
  schema: z.ZodSchema<T>
  onSubmit: (data: T, delta: Partial<T>) => MaybePromise
}

export function Form<T>(props: FormProps<T>) {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const valuesRef = useRef<Record<string, any>>({})
  const defaultValuesRef = useRef<Record<string, any>>({})
  const changeListenersRef = useRef<Record<string, () => void>>({})
  const beforeSubmitListenersRef = useRef<Record<string, () => MaybePromise<void | (() => MaybePromise)>>>({})

  const notify = useCallback((name: string | string[]) => {
    const names = typeof name === 'string' ? [name] : name

    for (const name of names) {
      const callback = changeListenersRef.current[name]
      if (callback) callback()
    }
  }, [])

  const setValue = useCallback(
    (name: string, value: any) => {
      valuesRef.current[name] = value
      notify(name)
    },
    [notify]
  )

  const setDefaultValue = useCallback(
    (name: string, value: any) => {
      defaultValuesRef.current[name] = value
      notify(name)
    },
    [notify]
  )

  const addChangeListener = useCallback((name: string, callback: () => void) => {
    changeListenersRef.current[name] = callback

    return () => {
      delete changeListenersRef.current[name]
    }
  }, [])

  const addBeforeSubmitListener = useCallback(
    (name: string, callback: () => MaybePromise<void | (() => MaybePromise)>) => {
      beforeSubmitListenersRef.current[name] = callback

      return () => {
        delete beforeSubmitListenersRef.current[name]
      }
    },
    []
  )

  const onSubmitRef = useCallbackRef(props.onSubmit)

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()

      setLoading(true)
      setErrors({})

      try {
        const callbacks: (() => MaybePromise)[] = []

        const listeners = Object.values(beforeSubmitListenersRef.current)
        for (const listener of listeners) {
          const callback = await listener()
          if (callback) callbacks.push(callback)
        }

        const keys = new Set([...Object.keys(valuesRef.current), ...Object.keys(defaultValuesRef.current)])

        let data: any = {}
        let delta: any = {}

        keys.forEach((key) => {
          if (key.startsWith('_')) return

          data = setValueForKeyPath(key, valueOrDefault(valuesRef.current[key], defaultValuesRef.current[key]), data)

          if (
            typeof valuesRef.current[key] !== 'undefined' &&
            valuesRef.current[key] !== defaultValuesRef.current[key]
          ) {
            delta = setValueForKeyPath(key, valuesRef.current[key], delta)
          }
        })

        const parsedData = props.schema.parse(data)
        await onSubmitRef.current(parsedData, delta)

        for (const callback of callbacks) {
          await callback()
        }
      } catch (error) {
        const errors: Record<string, string> = {}

        if (error instanceof z.ZodError) {
          errors[FORM_ERROR_KEY] = 'Validation errors'
          error.errors.forEach((error) => {
            errors[error.path.join('.')] = error.message
          })
        } else if (error instanceof Error) {
          errors[FORM_ERROR_KEY] = error.message
        } else {
          errors[FORM_ERROR_KEY] = String(error)
        }

        setErrors(errors)
      } finally {
        setLoading(false)
      }
    },
    [props.schema, onSubmitRef]
  )

  const context = {
    loading,
    errors,
    values: valuesRef.current,
    defaultValues: defaultValuesRef.current,
    setValue,
    setDefaultValue,
    addChangeListener,
    addBeforeSubmitListener,
  }

  return (
    <FormContext.Provider value={context}>
      <form onSubmit={onSubmit}>{props.children}</form>
    </FormContext.Provider>
  )
}

export function useForm() {
  const form = useContext(FormContext)

  if (!form) {
    throw new Error('Form context was not found')
  }

  return form
}

export function useFormInput<T>(
  name: string,
  defaultValue?: T,
  onBeforeSubmit?: () => MaybePromise<void | (() => MaybePromise)>
) {
  const {
    loading,
    errors,
    values,
    defaultValues,
    setValue,
    setDefaultValue,
    addChangeListener,
    addBeforeSubmitListener,
  } = useForm()

  useEffect(() => {
    setDefaultValue(name, defaultValue)
  }, [name, defaultValue, setDefaultValue])

  const onBeforeSubmitRef = useCallbackRef(onBeforeSubmit)

  useEffect(() => {
    return addBeforeSubmitListener(name, async () => {
      return await onBeforeSubmitRef.current?.()
    })
  }, [name, addBeforeSubmitListener, onBeforeSubmitRef])

  const subscribe = useCallback(
    (callback: () => void) => {
      return addChangeListener(name, callback)
    },
    [name, addChangeListener]
  )

  const getValue = useCallback(() => {
    return valueOrDefault(values[name], defaultValues[name])
  }, [name, values, defaultValues])

  const value = useSyncExternalStore<Maybe<T>>(subscribe, getValue, getValue)

  const error = useMemo(() => {
    return errors[name]
  }, [name, errors])

  const hasError = useMemo(() => {
    return !!error
  }, [error])

  const onChange = useCallback(
    (value: Maybe<T>) => {
      setValue(name, value)
    },
    [name, setValue]
  )

  return {
    value,
    onChange,
    disabled: loading,
    error,
    hasError,
  }
}

export type FormInputProps<T = unknown, E = {}> = E & {
  name: string
  defaultValue?: T
}
