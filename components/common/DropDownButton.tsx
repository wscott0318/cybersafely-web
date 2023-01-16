import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import ArrowUpIcon from '@mui/icons-material/KeyboardArrowUpOutlined'
import { Button, ButtonProps, Menu } from '@mui/material'
import React, { useCallback, useMemo } from 'react'

type DropDownButtonProps = {
  title: string
  children: React.ReactNode
} & Pick<ButtonProps, 'startIcon' | 'variant' | 'size'>

export function DropDownButton(props: DropDownButtonProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

  const open = useMemo(() => Boolean(anchorEl), [anchorEl])

  const handleClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
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
      <Button {...buttonProps} endIcon={open ? <ArrowUpIcon /> : <ArrowDownIcon />} onClick={handleClick}>
        {title}
      </Button>
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose} PaperProps={{ sx: { mt: 1, mb: 1 } }}>
        {items}
      </Menu>
    </>
  )
}
