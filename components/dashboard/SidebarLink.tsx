import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useRouter } from 'next/router'
import { NextLink } from '../common/NextLink'

type SidebarLinkProps = {
  icon: React.ReactNode
  title: string
  subtitle?: string
  color?: string
} & (
  | {
      href: string
    }
  | {
      onClick: () => void
    }
)

export function SidebarLink(props: SidebarLinkProps) {
  const router = useRouter()

  if ('onClick' in props) {
    return (
      <ListItemButton
        onClick={props.onClick}
        sx={(theme) => ({
          m: 1,
          color: props.color,
          borderRadius: theme.shape.borderRadius + 'px',
        })}
      >
        <ListItemIcon sx={{ color: props.color }}>{props.icon}</ListItemIcon>
        <ListItemText primary={props.title} secondary={props.subtitle} />
      </ListItemButton>
    )
  }

  const isSelected = router.pathname.startsWith(props.href)

  return (
    <NextLink href={props.href}>
      <ListItemButton
        component="a"
        selected={isSelected}
        sx={(theme) => ({
          m: 1,
          color: props.color,
          borderRadius: theme.shape.borderRadius + 'px',
        })}
      >
        <ListItemIcon sx={{ color: props.color }}>{props.icon}</ListItemIcon>
        <ListItemText primary={props.title} secondary={props.subtitle} />
      </ListItemButton>
    </NextLink>
  )
}
