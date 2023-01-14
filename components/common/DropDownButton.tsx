import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import ArrowUpIcon from '@mui/icons-material/KeyboardArrowUpOutlined'
import { Button, Menu } from '@mui/material'
import React, { useCallback, useMemo } from 'react'

type DropDownButtonProps = {
  title: string
  startIcon?: React.ReactNode
  children: React.ReactNode
}

export function DropDownButton(props: DropDownButtonProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

  const open = useMemo(() => Boolean(anchorEl), [anchorEl])

  const handleClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const children = useMemo(() => {
    return React.Children.map(props.children, (child) => {
      if (React.isValidElement<any>(child)) {
        return React.cloneElement(child, {
          disableRipple: true,
          onClick: () => {
            handleClose()
            child.props.onClick?.()
          },
        })
      }

      return child
    })
  }, [props.children])

  return (
    <>
      <Button startIcon={props.startIcon} endIcon={open ? <ArrowUpIcon /> : <ArrowDownIcon />} onClick={handleClick}>
        {props.title}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} PaperProps={{ sx: { mt: 1 } }}>
        {children}
      </Menu>
    </>
  )
}
