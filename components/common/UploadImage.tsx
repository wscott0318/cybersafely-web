import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import ImageIcon from '@mui/icons-material/ImageOutlined'
import UploadIcon from '@mui/icons-material/UploadOutlined'
import { Avatar, Badge, Box, Button, CircularProgress, IconButton, Stack } from '@mui/material'
import { useFileUpload } from '../../utils/upload'

type UploadImageProps = {
  src?: string
  onUpload: (id: string | null) => void
}

export function UploadImage(props: UploadImageProps) {
  const { upload, loading } = useFileUpload()

  return (
    <Stack alignItems="center" spacing={1}>
      <Box position="relative">
        {loading && <CircularProgress size={128 + 16} thickness={0.8} sx={{ position: 'absolute', top: 0, left: 0 }} />}
        <Badge
          overlap="circular"
          sx={{ margin: '8px' }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          badgeContent={
            !!props.src ? (
              <Box borderRadius={999} bgcolor="error.main" color="white">
                <IconButton color="inherit" size="small" onClick={() => props.onUpload(null)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ) : undefined
          }
        >
          <Avatar sx={{ width: 128, height: 128, fontSize: '3rem' }} src={props.src}>
            <ImageIcon fontSize="inherit" />
          </Avatar>
        </Badge>
      </Box>
      <Button
        variant="outlined"
        disabled={loading}
        startIcon={<UploadIcon />}
        onClick={async () => {
          const result = await upload({ accept: 'image/*', resize: 128 })
          if (result) props.onUpload(result)
        }}
      >
        Upload new image
      </Button>
    </Stack>
  )
}
