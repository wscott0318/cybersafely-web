import { Box, Stack, Typography } from '@mui/material'
import React, { useMemo } from 'react'
import { useCallbackRef } from '../../helpers/hooks'

type AccordionContextProps = {
  children: React.ReactNode
  title?: string
  index?: number
  setIndex?: (index: number | undefined) => void
}

export function AccordionContext(props: AccordionContextProps) {
  const setIndex = useCallbackRef(props.setIndex)

  const children = useMemo(() => {
    return React.Children.map(props.children, (child, index) => {
      if (React.isValidElement<any>(child)) {
        return React.cloneElement(child, {
          ...child.props,
          expanded: props.index === index,
          onChange: (_: any, expanded: boolean) => {
            if (expanded) setIndex.current?.(index)
            else setIndex.current?.(undefined)
          },
        })
      }

      return child
    })
  }, [props.children, props.index, setIndex])

  return (
    <Stack>
      {!!props.title && <Typography variant="h5">{props.title}</Typography>}
      <Box>{children}</Box>
    </Stack>
  )
}
