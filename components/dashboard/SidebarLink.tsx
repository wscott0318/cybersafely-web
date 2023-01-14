import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useRouter } from 'next/router'
import { NextLink } from '../common/NextLink'

type SidebarLinkProps = {
  href: string
  icon: React.ReactNode
  title: string
  color?: string
}

export function SidebarLink(props: SidebarLinkProps) {
  const router = useRouter()
  const isSelected = router.pathname.startsWith(props.href)

  return (
    <NextLink href={props.href}>
      <ListItemButton component="a" selected={isSelected} sx={{ color: props.color }}>
        <ListItemIcon sx={{ color: 'inherit' }}>{props.icon}</ListItemIcon>
        <ListItemText primary={props.title} />
      </ListItemButton>
    </NextLink>
  )
}
