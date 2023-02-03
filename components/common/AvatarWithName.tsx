import SchoolIcon from '@mui/icons-material/School'
import { Avatar, Stack, Typography } from '@mui/material'

type AvatarWithNameProps = {
  src?: string
  name: string
  type?: 'school'
}

export function AvatarWithName(props: AvatarWithNameProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Avatar sx={{ width: 24, height: 24 }} src={props.src}>
        {props.type === 'school' ? <SchoolIcon fontSize="small" /> : undefined}
      </Avatar>
      <Typography variant="inherit">{props.name}</Typography>
    </Stack>
  )
}
