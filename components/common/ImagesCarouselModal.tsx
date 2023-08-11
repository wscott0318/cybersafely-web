import ChevronLeft from '@mui/icons-material/ChevronLeft'
import ChevronRight from '@mui/icons-material/ChevronRight'
import { Box, IconButton, Stack, useTheme } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'

export const ImagesCarouselModal = (props: { images: string[]; index?: number }) => {
  const theme = useTheme()

  const [index, setIndex] = useState(props.index ?? 0)

  const previousImage = useCallback(() => {
    setIndex((index) => (index === 0 ? props.images.length - 1 : index - 1))
  }, [])

  const nextImage = useCallback(() => {
    setIndex((index) => (index === props.images.length - 1 ? 0 : index + 1))
  }, [])

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        previousImage()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        nextImage()
      }
    }

    document.addEventListener('keydown', handleKeyboard)

    return () => {
      document.removeEventListener('keydown', handleKeyboard)
    }
  }, [])

  return (
    <Box position="relative">
      <img
        alt="carousel image"
        src={props.images[index]}
        style={{ width: '100%', display: 'block', maxHeight: '75vh' }}
      />
      <Box top={24} left={24} right={24} bottom={24} position="absolute">
        <Stack height="100%" direction="row" alignItems="center" justifyContent="space-between">
          {props.images.length > 1 && (
            <>
              <IconButton sx={{ background: theme.palette.grey[100] }} onClick={previousImage}>
                <ChevronLeft />
              </IconButton>
              <IconButton sx={{ background: theme.palette.grey[100] }} onClick={nextImage}>
                <ChevronRight />
              </IconButton>
            </>
          )}
        </Stack>
      </Box>
    </Box>
  )
}
