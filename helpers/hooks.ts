import { useMediaQuery, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

export function useCallbackRef<T>(callback: T) {
  const callbackRef = useRef(callback)

  useLayoutEffect(() => {
    callbackRef.current = callback
  }, [callback])

  return callbackRef
}

export function useLogoUrl() {
  const isDark = useMediaQuery('(prefers-color-scheme: dark)')

  return useMemo(() => {
    return isDark ? '/images/logo-white.png' : '/images/logo-black.png'
  }, [isDark])
}

export function useOnTop(offset: number = 0) {
  const [isOnTop, setIsOnTop] = useState(true)

  useEffect(() => {
    function onScroll() {
      setIsOnTop(window.scrollY <= offset)
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [offset])

  return { isOnTop }
}

export function useSessionStorage(key: string) {
  const [value, setValue] = useState<string | null>()

  useEffect(() => {
    setValue(sessionStorage.getItem(key))
  }, [key])

  const changeValue = useCallback(
    (value: string | null) => {
      setValue(value)

      if (typeof value === 'string') {
        sessionStorage.setItem(key, value)
      } else {
        sessionStorage.removeItem(key)
      }
    },
    [key]
  )

  return [value, changeValue] as const
}

export function useMobile() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  return { isMobile, isTablet }
}

const OutConverter = {
  boolean: (value: string) => value === 'true',
  string: (value: string) => value,
  number: (value: string) => parseInt(value),
}

const InConverter = {
  boolean: (value: boolean) => (value ? 'true' : 'false'),
  string: (value: string) => value,
  number: (value: number) => value.toString(),
}

type ConverterType<T extends keyof typeof OutConverter> = T extends 'boolean'
  ? boolean
  : T extends 'string'
  ? string
  : T extends 'number'
  ? number
  : unknown

export function useQueryParam<T extends keyof typeof OutConverter>(name: string, type = 'string' as T) {
  const router = useRouter()

  const value = useMemo(() => {
    const value = router.query[name]

    if (typeof value === 'string') {
      return OutConverter[type](value) as ConverterType<T>
    }
  }, [router.query, name])

  const onChange = useCallback(
    (value: ConverterType<T> | undefined) => {
      if (typeof value === 'undefined') {
        delete router.query[name]
      } else {
        const converter = InConverter[type] as (value: ConverterType<T>) => string
        router.query[name] = converter(value)
      }
      router.replace(router)
    },
    [router.query, name]
  )

  return [value, onChange] as const
}
