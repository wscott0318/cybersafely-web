import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import ArrowUpIcon from '@mui/icons-material/KeyboardArrowUpOutlined'
import { Button, ButtonProps, Menu, SxProps, Theme } from '@mui/material'
import React, { useCallback, useMemo, useRef, useState } from 'react'

type DropDownButtonProps = {
  title?: React.ReactNode
  children: React.ReactNode
  uppercase?: boolean
  buttonSx?: SxProps<Theme>
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
        size="small"
        variant="text"
        {...buttonProps}
        ref={anchorEl}
        onClick={handleClick}
        endIcon={open ? <ArrowUpIcon /> : <ArrowDownIcon />}
        sx={{
          flexShrink: 0,
          textTransform: uppercase === false ? 'unset' : undefined,
          ...props.buttonSx,
        }}
      >
        {title ?? 'Actions'}
      </Button>
      <Menu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl.current}
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
