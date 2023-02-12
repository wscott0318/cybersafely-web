import { Box, Stack, Typography } from '@mui/material'
import React, { useMemo, useState } from 'react'

type AccordionContextProps = {
  children: React.ReactNode
  initialSelected?: number
  title?: string
}

export function AccordionContext(props: AccordionContextProps) {
  const [selected, setSelected] = useState(props.initialSelected)

  const children = useMemo(() => {
    return React.Children.map(props.children, (child, index) => {
      if (React.isValidElement<any>(child)) {
        return React.cloneElement(child, {
          ...child.props,
          expanded: selected === index,
          onChange: (_: any, expanded: boolean) => {
            if (expanded) setSelected(index)
            else setSelected(undefined)
          },
        })
      }

      return child
    })
  }, [props.children, selected])

  return (
    <Stack>
      {!!props.title && <Typography variant="h5">{props.title}</Typography>}
      <Box>{children}</Box>
    </Stack>
  )
}
