import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import { useCallback, useState } from 'react'
import { AlertInternal, useAlert } from '../../utils/context/alert'

type SimpleAlertProps = {
  alert: AlertInternal
}

function SimpleAlert({ alert }: SimpleAlertProps) {
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
              onChange={(e) => setInput(e.target.value)}
            />
          )}
        </DialogContent>
        <DialogActions>
          {alert.type === 'result' && (
            <>
              <Button variant="text" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="text"
                onClick={() => {
                  onClose()
                  alert.result(input)
                }}
              >
                OK
              </Button>
            </>
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
          {alert.type === 'alert' && (
            <Button autoFocus variant="text" onClick={onClose}>
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
