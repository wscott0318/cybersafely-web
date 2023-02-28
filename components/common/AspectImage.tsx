import ImageIcon from '@mui/icons-material/Image'
import { Box, SxProps, Theme } from '@mui/material'

type AspectImageProps = {
  sx: SxProps<Theme>
  src?: string | null
  onClick?: () => void
  aspect?: number
}

export function AspectImage(props: AspectImageProps) {
  return (
    <Box
      width="100%"
      sx={props.sx}
      borderRadius={1}
      bgcolor="divider"
      overflow="hidden"
      position="relative"
      onClick={props.onClick}
      paddingTop={(props.aspect ?? 0.5) * 100 + '%'}
    >
      {!!props.src ? (
        <img
          alt={props.src}
          src={props.src}
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
          }}
        />
      ) : (
        <Box
          sx={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            position: 'absolute',
            alignItems: 'center',
            color: 'text.disabled',
            justifyContent: 'center',
          }}
        >
          <ImageIcon />
        </Box>
      )}
    </Box>
  )
}
