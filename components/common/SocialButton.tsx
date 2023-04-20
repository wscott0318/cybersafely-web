import UnlinkIcon from '@mui/icons-material/CloseOutlined'
import OpenIcon from '@mui/icons-material/OpenInNewOutlined'
import { Button, ButtonGroup, Tooltip, Typography } from '@mui/material'

type SocialButtonProps = {
  icon: React.ReactNode
  name: string
  color: string
  linked?: boolean
  username?: string
  onLink?: () => Promise<string>
  onUnlink?: () => Promise<void>
  disabled?: boolean
}

export function SocialButton(props: SocialButtonProps) {
  if (props.linked) {
    return (
      <ButtonGroup fullWidth variant="contained">
        <Button
          startIcon={props.icon}
          sx={(theme) => ({
            color: 'white',
            bgcolor: props.color,
            textTransform: 'unset',
            justifyContent: 'flex-start',
            borderColor: theme.palette.background.paper + ' !important',
            ':hover': {
              bgcolor: props.color,
            },
          })}
        >
          {props.username ?? props.name}
        </Button>
        <Tooltip title={`Unlink ${props.name}`}>
          <Button
            sx={{
              maxWidth: 40,
              color: 'white',
              bgcolor: props.color,
              textTransform: 'unset',
              ':hover': {
                bgcolor: props.color,
              },
            }}
            onClick={async () => {
              if (props.onUnlink) {
                await props.onUnlink()
              }
            }}
          >
            <UnlinkIcon fontSize="small" />
          </Button>
        </Tooltip>
      </ButtonGroup>
    )
  }

  return (
    <Button
      fullWidth
      color="inherit"
      endIcon={<OpenIcon />}
      startIcon={props.icon}
      sx={{
        color: 'white',
        bgcolor: props.color,
        textTransform: 'unset',
        justifyContent: 'flex-start',
        opacity: props.disabled ? 0.1 : 1,
        pointerEvents: props.disabled ? 'none' : 'auto',
        ':hover': {
          bgcolor: props.color,
        },
      }}
      onClick={async () => {
        if (props.onLink) {
          const url = await props.onLink()
          document.location = url
        }
      }}
    >
      <Typography variant="inherit" flexGrow={1} textAlign="start">
        Link {props.name}
      </Typography>
    </Button>
  )
}
