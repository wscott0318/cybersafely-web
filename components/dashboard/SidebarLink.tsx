import { ListItemButton, listItemButtonClasses, ListItemIcon, listItemIconClasses, ListItemText } from '@mui/material'
import { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { NextLink } from '../common/NextLink'

type SidebarLinkProps = {
  icon: React.ReactNode
  title: string
  subtitle?: string
  color?: string
  href: LinkProps['href']
}

export function SidebarLink(props: SidebarLinkProps) {
  const router = useRouter()
  const isSelected = router.pathname.startsWith(typeof props.href === 'string' ? props.href : '/')

  return (
    <NextLink href={props.href}>
      <ListItemButton
        component="a"
        selected={isSelected}
        sx={(theme) => ({
          mx: 1,
          my: 0.5,
          color: props.color,
          borderRadius: isSelected
            ? `0 ${theme.shape.borderRadius * 2 + 'px'} ${theme.shape.borderRadius * 2 + 'px'} 0`
            : theme.shape.borderRadius * 2 + 'px',
          ['&:not(.' + listItemButtonClasses.selected + ')']: {
            ['.' + listItemIconClasses.root]: {
              color: 'primary.main',
            },
          },
          ['&.' + listItemButtonClasses.selected]: {
            background: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
          },
          borderLeft: isSelected ? `3px solid ${theme.palette.primary.main}` : 'none',
        })}
      >
        <ListItemIcon sx={{ color: (theme) => (isSelected ? theme.palette.primary.main : 'inherit') }}>
          {props.icon}
        </ListItemIcon>
        <ListItemText
          primary={props.title}
          secondary={props.subtitle}
          primaryTypographyProps={{
            fontWeight: isSelected ? 700 : 400,
          }}
          sx={{
            color: (theme) => (isSelected ? theme.palette.primary.main : 'inherit'),
          }}
        />
      </ListItemButton>
    </NextLink>
  )
}
