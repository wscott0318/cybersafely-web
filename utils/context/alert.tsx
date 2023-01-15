import React, { createContext, useCallback, useContext, useRef, useState } from 'react'

type Alert = {
  title: string
  message: string
  confirm?: (input: string) => void
  useInput?: boolean
}

export type AlertInternal = Alert & {
  id: number
  onClose: () => void
}

type AlertContext = {
  alerts: AlertInternal[]
  pushAlert: (title: string, message: string, confirm?: (input: string) => void, useInput?: boolean) => () => void
}

const AlertContext = createContext<Partial<AlertContext>>({})

type AlertProviderProps = {
  children: React.ReactNode
}

export function AlertContextProvider(props: AlertProviderProps) {
  let prevId = useRef(0).current

  const [alerts, setAlerts] = useState<AlertInternal[]>([])

  const pushAlert = useCallback(
    (title: string, message: string, confirm?: (input: string) => void, useInput?: boolean) => {
      const id = ++prevId

      const onClose = () => {
        setAlerts((alerts) => alerts.filter((e) => e.id !== id))
      }

      setAlerts((alerts) => [...alerts, { id, onClose, title, message, confirm, useInput }])

      return onClose
    },
    []
  )

  return <AlertContext.Provider value={{ alerts, pushAlert }}>{props.children}</AlertContext.Provider>
}

export function useAlert() {
  const { alerts, pushAlert } = useContext(AlertContext)

  return {
    alerts: alerts!,
    pushAlert: pushAlert!,
  }
}
