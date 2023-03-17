import { Alert, AlertColor, AlertTitle } from '@mui/material'
import React from 'react'
import { NextLink } from './NextLink'

export type InfoCardProps = {
  href: string
  title?: string
  message: React.ReactNode
  severity?: AlertColor
}

export function InfoCard(props: InfoCardProps) {
  return (
    <NextLink href={props.href}>
      <Alert severity={props.severity ?? 'warning'} sx={{ cursor: 'pointer' }}>
        <AlertTitle>{props.title ?? 'Missing Information'}</AlertTitle>
        {props.message}
      </Alert>
    </NextLink>
  )
}
