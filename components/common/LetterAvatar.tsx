import { Avatar, AvatarProps } from '@mui/material'
import { amber, blue, blueGrey, green, lime, orange, purple, red } from '@mui/material/colors'
import { useMemo } from 'react'

const colors = [red[400], green[400], blue[400], amber[400], blueGrey[400], lime[400], orange[400], purple[400]]

type LetterAvatarProps = AvatarProps & {
  name?: string
}

export function LetterAvatar(props: LetterAvatarProps) {
  const { name, ...restProps } = props

  const initial = useMemo(() => {
    if (name && name.length > 0) {
      return name[0].toUpperCase()
    }
  }, [name])

  const background = useMemo(() => {
    if (initial) {
      const index = initial.charCodeAt(0)
      return colors[index % colors.length]
    }
  }, [initial])

  return (
    <Avatar {...restProps} sx={{ ...restProps.sx, background }}>
      {initial}
    </Avatar>
  )
}
