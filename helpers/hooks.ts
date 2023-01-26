import { useMediaQuery, useTheme } from '@mui/material'
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
