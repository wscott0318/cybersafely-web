import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import { useCallback, useRef, useState } from 'react'
import { AlertInternal, useAlert } from '../../utils/context/alert'

type SimpleAlertProps = {
  alert: AlertInternal<any>
}

function SimpleAlert({ alert }: SimpleAlertProps) {
  const ref = useRef<{ onSubmit: () => any }>(null)

  const [open, setOpen] = useState(true)
  const [input, setInput] = useState('')

  const onClose = useCallback(() => {
    setOpen(false)
  }, [])

  const onRemove = useCallback(() => {
    alert.onClose()
  }, [alert])

  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth="xs"
      onClose={onClose}
      TransitionProps={{
        onExited: onRemove,
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()

          switch (alert.type) {
            case 'result':
              alert.result(input)
              onClose()

              break

            case 'custom':
              if (ref.current) {
                const value = ref.current.onSubmit()
                alert.result(value)
              }

              onClose()

              break

            default:
              break
          }
        }}
      >
        <DialogTitle>{alert.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{alert.message}</DialogContentText>
          {alert.type === 'result' && (
            <TextField
              required
              autoFocus
              fullWidth
              value={input}
              margin="dense"
              variant="standard"
              label={alert.label}
              type={alert.resultType}
              onChange={(e) => setInput(e.target.value)}
            />
          )}
          {alert.type === 'custom' && <alert.content ref={ref} />}
        </DialogContent>
        <DialogActions>
          {alert.type === 'alert' && (
            <Button autoFocus variant="text" onClick={onClose}>
              OK
            </Button>
          )}
          {alert.type === 'confirm' && (
            <>
              <Button variant="text" onClick={onClose}>
                Cancel
              </Button>
              <Button
                autoFocus
                variant="text"
                onClick={() => {
                  onClose()
                  alert.confirm!()
                }}
              >
                OK
              </Button>
            </>
          )}
          {alert.type === 'result' && (
            <>
              <Button variant="text" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="text">
                OK
              </Button>
            </>
          )}
          {alert.type === 'custom' && (
            <>
              <Button variant="text" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="text">
                OK
              </Button>
            </>
          )}
        </DialogActions>
      </form>
    </Dialog>
  )
}

export function Alerts() {
  const { alerts } = useAlert()

  return (
    <>
      {alerts.map((alert, index) => (
        <SimpleAlert key={String(index)} alert={alert} />
      ))}
    </>
  )
}
