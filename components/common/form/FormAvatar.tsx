import ImageIcon from '@mui/icons-material/ImageOutlined'
import { Avatar, Box, CircularProgress } from '@mui/material'
import { useState } from 'react'
import { Image, UpdateImageForEnum, useRemoveImageMutation, useUpdateImageMutation } from '../../../schema'
import { useFileUpload } from '../../../utils/upload'
import { DeleteBadge } from '../DeleteBadge'

type FormAvatarProps = {
  image: Pick<Image, 'id' | 'url'> | undefined | null
  for: UpdateImageForEnum
  forId: string
  onChange?: () => void | Promise<void>
}

export function FormAvatar(props: FormAvatarProps) {
  const { upload } = useFileUpload()

  const [updateImage] = useUpdateImageMutation()
  const [removeImage] = useRemoveImageMutation()

  const [loading, setLoading] = useState(false)

  return (
    <Box>
      <DeleteBadge
        overlap="circular"
        canDelete={!!props.image}
        onDelete={async () => {
          try {
            setLoading(true)

            await removeImage({ variables: { id: props.image!.id } })
            await props.onChange?.()
          } finally {
            setLoading(false)
          }
        }}
      >
        <Box position="relative">
          <Avatar
            src={props.image?.url}
            sx={{ width: 100, height: 100, cursor: 'pointer' }}
            onClick={async () => {
              try {
                setLoading(true)

                const uploadId = await upload()

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

                  await props.onChange?.()
                }
              } finally {
                setLoading(false)
              }
            }}
          >
            <ImageIcon fontSize="large" />
          </Avatar>
          {loading && <CircularProgress size={110} thickness={1} sx={{ position: 'absolute', top: -5, left: -5 }} />}
        </Box>
      </DeleteBadge>
    </Box>
  )
}
