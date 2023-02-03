import RemoveIcon from '@mui/icons-material/DeleteOutlined'
import UploadIcon from '@mui/icons-material/UploadOutlined'
import { Avatar, Box, Button, ButtonGroup, CircularProgress, Stack } from '@mui/material'
import { useFileUpload } from '../../utils/upload'

type UploadAvatarProps = {
  src?: string
  onUpload: (id: string | null) => void
}

export function UploadAvatar(props: UploadAvatarProps) {
  const { upload, loading } = useFileUpload()

  return (
    <Stack alignItems="center">
      <Box position="relative">
        {loading && <CircularProgress size={128 + 16} thickness={0.8} sx={{ position: 'absolute', top: 0, left: 0 }} />}
        <Avatar sx={{ width: 128, height: 128, margin: '8px' }} src={props.src} />
      </Box>
      <ButtonGroup fullWidth disabled={loading} size="small">
        <Button
          startIcon={<UploadIcon />}
          onClick={async () => {
            const result = await upload({ accept: 'image/*', resize: 128 })
            if (result) props.onUpload(result)
          }}
        >
          Upload a new image
        </Button>
        <Button startIcon={<RemoveIcon />} onClick={() => props.onUpload(null)} disabled={!props.src}>
          Remove the current one
        </Button>
      </ButtonGroup>
    </Stack>
  )
}
