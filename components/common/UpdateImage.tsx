import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import ImageIcon from '@mui/icons-material/ImageOutlined'
import UploadIcon from '@mui/icons-material/UploadOutlined'
import { Avatar, Badge, Box, Button, CircularProgress, IconButton, Stack } from '@mui/material'
import { Image, UpdateImageInput, useRemoveImageMutation, useUpdateImageMutation } from '../../schema'
import { useFileUpload } from '../../utils/upload'

type UpdateImageProps = {
  image?: Pick<Image, 'id' | 'url'> | undefined | null
  onChange?: () => void
  refetchQueries?: string[]
} & Pick<UpdateImageInput, 'for' | 'forId'>

export function UpdateImage(props: UpdateImageProps) {
  const { upload, loading } = useFileUpload()

  const [updateImage] = useUpdateImageMutation({
    refetchQueries: props.refetchQueries,
    onCompleted: () => props.onChange?.(),
  })
  const [removeImage] = useRemoveImageMutation({
    refetchQueries: props.refetchQueries,
    onCompleted: () => props.onChange?.(),
  })

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
            props.image ? (
              <Box borderRadius={999} bgcolor="error.main" color="white">
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={() => removeImage({ variables: { id: props.image!.id } })}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ) : undefined
          }
        >
          <Avatar sx={{ width: 128, height: 128, fontSize: '3rem' }} src={props.image?.url}>
            <ImageIcon fontSize="inherit" />
          </Avatar>
        </Badge>
      </Box>
      <Button
        variant="outlined"
        disabled={loading}
        startIcon={<UploadIcon />}
        onClick={async () => {
          const uploadId = await upload({ accept: 'image/*', resize: 128 })

          if (uploadId) {
            await updateImage({
              variables: {
                input: {
                  uploadId,
                  for: props.for,
                  forId: props.forId,
                },
              },
            })
          }
        }}
      >
        Upload new image
      </Button>
    </Stack>
  )
}
