import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import ArrowUpIcon from '@mui/icons-material/KeyboardArrowUpOutlined'
import { Button, ButtonProps, Menu } from '@mui/material'
import React, { useCallback, useMemo, useRef, useState } from 'react'

type DropDownButtonProps = {
  title: string
  children: React.ReactNode
} & Pick<ButtonProps, 'startIcon' | 'variant' | 'size' | 'fullWidth'>

export function DropDownButton(props: DropDownButtonProps) {
  const anchorEl = useRef<HTMLButtonElement>(null)

  const [open, setOpen] = useState(false)

  const handleClick = useCallback(() => {
    setOpen((open) => !open)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const { children, title, ...buttonProps } = props

  const items = useMemo(() => {
    return React.Children.map(children, (child) => {
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
  }, [children])

  return (
    <>
      <Button
        {...buttonProps}
        ref={anchorEl}
        onClick={handleClick}
        endIcon={open ? <ArrowUpIcon /> : <ArrowDownIcon />}
      >
        {title}
      </Button>
      <Menu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl.current}
        PaperProps={{ sx: { mt: 1, mb: 1 } }}
        MenuListProps={{ sx: { minWidth: anchorEl.current?.clientWidth } }}
      >
        {items}
      </Menu>
    </>
  )
}
