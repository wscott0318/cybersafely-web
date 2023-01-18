import React, { createContext, useCallback, useContext, useRef, useState } from 'react'

type Alert<P> = {
  title: string
  message: string
} & (
  | {
      type: 'alert'
    }
  | {
      type: 'confirm'
      confirm: () => void
    }
  | {
      type: 'result'
      label: string
      resultType?: string
      result: (value: string) => void
    }
  | {
      type: 'custom'
      content: React.ForwardRefExoticComponent<React.RefAttributes<{ onSubmit: () => P }>>
      result: (value: P) => void
    }
)

export type AlertInternal<P> = Alert<P> & {
  id: number
  onClose: () => void
}

type AlertContext = {
  alerts: AlertInternal<any>[]
  pushAlert: <P>(alert: Alert<P>) => () => void
}

const AlertContext = createContext<AlertContext | null>(null)

type AlertProviderProps = {
  children: React.ReactNode
}

export function AlertContextProvider(props: AlertProviderProps) {
  let prevId = useRef(0).current

  const [alerts, setAlerts] = useState<AlertInternal<any>[]>([])

  const pushAlert = useCallback(<P extends any>(alert: Alert<P>) => {
    const id = ++prevId

    const onClose = () => {
      setAlerts((alerts) => alerts.filter((e) => e.id !== id))
    }

    setAlerts((alerts) => [...alerts, { id, onClose, ...alert }])

    return onClose
  }, [])

  return <AlertContext.Provider value={{ alerts, pushAlert }}>{props.children}</AlertContext.Provider>
}

export function useAlert() {
  const context = useContext(AlertContext)

  if (!context) {
    throw new Error('Alert parent context not found')
  }

  return context
}
