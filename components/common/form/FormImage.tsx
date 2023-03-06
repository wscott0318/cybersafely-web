import { Box, CircularProgress } from '@mui/material'
import { useState } from 'react'
import { Image, UpdateImageForEnum, useRemoveImageMutation, useUpdateImageMutation } from '../../../schema'
import { useFileUpload } from '../../../utils/upload'
import { AspectImage } from '../AspectImage'
import { DeleteBadge } from '../DeleteBadge'

type FormImageProps = {
  aspect: number
  image: Pick<Image, 'id' | 'url'> | undefined | null
  for: UpdateImageForEnum
  forId: string
  onChange?: () => void | Promise<void>
}

export function FormImage(props: FormImageProps) {
  const { upload } = useFileUpload()

  const [updateImage] = useUpdateImageMutation()
  const [removeImage] = useRemoveImageMutation()

  const [loading, setLoading] = useState(false)

  return (
    <DeleteBadge
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
      <Box width="100%" display="flex" alignItems="center" justifyContent="center">
        <AspectImage
          aspect={props.aspect}
          src={props.image?.url}
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
        />
        {loading && (
          <Box borderRadius="999px" position="absolute" bgcolor="rgba(0,0,0,0.5)">
            <CircularProgress size={50} thickness={2.5} sx={{ display: 'block', m: 1 }} />
          </Box>
        )}
      </Box>
    </DeleteBadge>
  )
}
