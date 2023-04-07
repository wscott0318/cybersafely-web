import ExpandMoreIcon from '@mui/icons-material/ExpandMoreOutlined'
import { Button, ButtonGroup, Menu } from '@mui/material'
import React, { useMemo, useRef, useState } from 'react'

export function ButtonSplitMenu({
  startIcon,
  title,
  onClick,
  children,
}: {
  startIcon?: React.ReactNode
  title: string
  onClick: () => void
  children: React.ReactNode
}) {
  const rootEl = useRef<HTMLDivElement>(null)

  const [open, setOpen] = useState(false)

  const mappedChildren = useMemo(() => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          ...child.props,
          onClick: (...props: any[]) => {
            child.props.onClick?.(...props)
            setOpen(false)
          },
        })
      }
      return child
    })
  }, [children])

  return (
    <>
      <ButtonGroup ref={rootEl}>
        <Button startIcon={startIcon} onClick={onClick}>
          {title}
        </Button>
        <Button size="small" onClick={() => setOpen(true)}>
          <ExpandMoreIcon />
        </Button>
      </ButtonGroup>
      <Menu
        open={open}
        anchorEl={rootEl.current}
        onClose={() => setOpen(false)}
        MenuListProps={{ disablePadding: false }}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: 1,
            minWidth: rootEl.current?.clientWidth,
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {mappedChildren}
      </Menu>
    </>
  )
}
