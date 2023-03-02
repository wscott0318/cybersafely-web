import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useCallback, useState } from 'react'
import { AlertInternal, useAlert } from '../../utils/context/alert'

type SimpleAlertProps = {
  alert: AlertInternal<any, {}>
}

function SimpleAlert({ alert }: SimpleAlertProps) {
  const [open, setOpen] = useState(true)

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
      PaperProps={{
        sx: {
          border: 'none',
        },
      }}
    >
      <DialogTitle>{alert.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{alert.message}</DialogContentText>
        {alert.type === 'custom' && (
          <alert.content
            {...alert.props}
            onSubmit={(value) => {
              alert.result(value)
              onClose()
            }}
          />
        )}
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
      </DialogActions>
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
