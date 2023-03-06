import SchoolIcon from '@mui/icons-material/School'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import { useMemo } from 'react'

type AvatarWithNameProps = {
  src?: string
  name: string
  email?: string
  type?: 'school'
}

export function AvatarWithName(props: AvatarWithNameProps) {
  const size = useMemo(() => {
    return !!props.email ? 32 : 24
  }, [props.email])

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Avatar sx={{ width: size, height: size }} src={props.src}>
        {props.type === 'school' ? <SchoolIcon fontSize="inherit" /> : undefined}
      </Avatar>
      <Box flexGrow={1}>
        <Typography variant="inherit">{props.name || '<No Name>'}</Typography>
        {!!props.email && (
          <Typography variant="body2" color="text.disabled">
            {props.email}
          </Typography>
        )}
      </Box>
    </Stack>
  )
}
