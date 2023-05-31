import ChevronIcon from '@mui/icons-material/ArrowForwardOutlined'
import { default as CloseIcon } from '@mui/icons-material/CloseOutlined'
import { Box, IconButton, Paper, Stack, Typography } from '@mui/material'

type SocialButtonProps = {
  icon: string
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
      <Paper sx={{ p: 1, pr: 1.5, display: 'block', textDecoration: 'none' }}>
        <Stack direction="row" alignItems="center">
          <Box bgcolor={props.color} borderRadius={1} p={1} sx={{ '& > *': { display: 'block' } }}>
            <img src={props.icon} alt={props.name} height={16} />
          </Box>
          <Typography flexGrow={1} overflow="hidden" textOverflow="ellipsis">
            {props.username}
          </Typography>
          <Box>
            <IconButton
              sx={{ m: -1 }}
              onClick={async () => {
                if (props.onUnlink) {
                  await props.onUnlink()
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Stack>
      </Paper>
    )
  }

  return (
    <Paper
      sx={{
        p: 1,
        pr: 1.5,
        opacity: props.disabled ? 0.25 : 1,
        cursor: props.disabled ? 'auto' : 'pointer',
      }}
      onClick={
        props.disabled
          ? undefined
          : async () => {
              if (props.onLink) {
                const url = await props.onLink()
                document.location = url
              }
            }
      }
    >
      <Stack direction="row" alignItems="center">
        <Box bgcolor={props.color} borderRadius={1} p={1} sx={{ '& > *': { display: 'block' } }}>
          <img src={props.icon} alt={props.name} height={16} />
        </Box>
        <Typography flexGrow={1} overflow="hidden" textOverflow="ellipsis">
          {props.name}
        </Typography>
        <ChevronIcon color="disabled" />
      </Stack>
    </Paper>
  )
}
