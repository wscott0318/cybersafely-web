import React, { createContext, useCallback, useContext, useRef, useState } from 'react'

type Alert = {
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
      result: (value: string) => void
    }
)

export type AlertInternal = Alert & {
  id: number
  onClose: () => void
}

type AlertContext = {
  alerts: AlertInternal[]
  pushAlert: (alert: Alert) => () => void
}

const AlertContext = createContext<AlertContext | null>(null)

type AlertProviderProps = {
  children: React.ReactNode
}

export function AlertContextProvider(props: AlertProviderProps) {
  let prevId = useRef(0).current

  const [alerts, setAlerts] = useState<AlertInternal[]>([])

  const pushAlert = useCallback((alert: Alert) => {
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
