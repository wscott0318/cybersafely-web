import DeleteIcon from '@mui/icons-material/RemoveOutlined'
import { Badge, Box, IconButton } from '@mui/material'
import React, { useState } from 'react'

type DeleteIconButtonProps = {
  onClick: () => void
}

function DeleteIconButton(props: DeleteIconButtonProps) {
  return (
    <Box bgcolor="error.main" borderRadius="999px">
      <IconButton size="small" color="inherit" onClick={props.onClick} sx={{ p: 0.25, color: 'white' }}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  )
}

type DeleteBadgeProps = {
  overlap?: 'circular' | 'rectangular'
  canDelete: boolean
  onDelete: () => void
  children: React.ReactNode
}

export function DeleteBadge(props: DeleteBadgeProps) {
  const [show, setShow] = useState(false)

  return (
    <Badge
      overlap={props.overlap}
      style={{ width: '100%' }}
      badgeContent={props.canDelete && show && <DeleteIconButton onClick={props.onDelete} />}
      componentsProps={{
        root: {
          onMouseEnter: () => setShow(true),
          onMouseLeave: () => setShow(false),
        },
      }}
    >
      {props.children}
    </Badge>
  )
}
