import { Avatar, Stack, Typography } from '@mui/material'

type AvatarWithNameProps = {
  src?: string
  name: string
}

export function AvatarWithName(props: AvatarWithNameProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Avatar sx={{ width: 24, height: 24 }} src={props.src} />
      <Typography variant="inherit">{props.name}</Typography>
    </Stack>
  )
}
