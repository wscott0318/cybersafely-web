import BackIcon from '@mui/icons-material/ArrowBackOutlined'
import { Box, Grid, IconButton, Stack, Typography } from '@mui/material'
import { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { useMobile } from '../../helpers/hooks'

type NavigationActionsProps = {
  children: React.ReactNode
}

export function NavigationActions(props: NavigationActionsProps) {
  const children = useMemo(() => {
    return React.Children.map(props.children, (child) => (
      <Grid item xs={12} sm="auto">
        {child}
      </Grid>
    ))
  }, [props.children])

  return <>{children}</>
}

type NavigationViewProps = {
  children: React.ReactNode
  title: string
  subtitle?: string
  actions?: React.ReactNode
  back?: LinkProps['href']
}

export function NavigationView(props: NavigationViewProps) {
  const router = useRouter()

  const { isMobile } = useMobile()

  return (
    <Stack>
      <Box>
        <Grid container spacing={1} alignItems="center" wrap={isMobile ? 'wrap' : 'nowrap'}>
          {!!props.back && (
            <Grid item>
              <IconButton edge="start" sx={{ mr: -0.5 }} onClick={() => router.push(props.back!)}>
                <BackIcon />
              </IconButton>
            </Grid>
          )}
          <Grid item flexGrow={1} overflow="hidden">
            <Typography variant="h5" noWrap>
              {props.title}{' '}
              {!!props.subtitle && (
                <Typography display="inline" color="text.disabled">
                  ({props.subtitle})
                </Typography>
              )}
            </Typography>
          </Grid>
          {props.actions}
        </Grid>
      </Box>
      {props.children}
    </Stack>
  )
}
