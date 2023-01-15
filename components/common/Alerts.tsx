import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import { useCallback, useState } from 'react'
import { AlertInternal, useAlert } from '../../utils/context/alert'

type SimpleAlertProps = {
  alert: AlertInternal
}

function SimpleAlert({ alert }: SimpleAlertProps) {
  const [input, setInput] = useState('')

  const onClose = useCallback(() => {
    alert.onClose()
  }, [alert])

  return (
    <Dialog open fullWidth maxWidth="xs">
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <DialogTitle>{alert.title}</DialogTitle>
        <DialogContent>
          {alert.useInput ? (
            <TextField
              required
              autoFocus
              fullWidth
              value={input}
              margin="dense"
              label={alert.message}
              onChange={(e) => setInput(e.target.value)}
            />
          ) : (
            <DialogContentText>{alert.message}</DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          {alert.confirm ? (
            <>
              <Button variant="text" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="text"
                onClick={() => {
                  onClose()
                  alert.confirm!(input)
                }}
              >
                OK
              </Button>
            </>
          ) : (
            <Button variant="text" onClick={onClose}>
              OK
            </Button>
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
