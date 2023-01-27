import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import ArrowUpIcon from '@mui/icons-material/KeyboardArrowUpOutlined'
import { Button, ButtonProps, Menu } from '@mui/material'
import React, { useCallback, useMemo, useRef, useState } from 'react'

type DropDownButtonProps = {
  title: string
  children: React.ReactNode
  uppercase?: boolean
} & Pick<ButtonProps, 'startIcon' | 'variant' | 'size' | 'fullWidth' | 'color'>

export function DropDownButton(props: DropDownButtonProps) {
  const anchorEl = useRef<HTMLButtonElement>(null)

  const [open, setOpen] = useState(false)

  const handleClick = useCallback(() => {
    setOpen((open) => !open)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const { children, title, uppercase, ...buttonProps } = props

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
  }, [children, handleClose])

  return (
    <>
      <Button
        {...buttonProps}
        ref={anchorEl}
        onClick={handleClick}
        endIcon={open ? <ArrowUpIcon /> : <ArrowDownIcon />}
        sx={{
          flexShrink: 0,
          textTransform: uppercase === false ? 'unset' : undefined,
        }}
      >
        {title}
      </Button>
      <Menu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl.current}
        PaperProps={{ sx: { mt: 1, mb: 1 } }}
        MenuListProps={{
          disablePadding: false,
          sx: { minWidth: anchorEl.current?.clientWidth },
        }}
      >
        {items}
      </Menu>
    </>
  )
}
