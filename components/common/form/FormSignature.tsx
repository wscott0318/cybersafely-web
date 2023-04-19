import { Typography } from '@mui/material'
import { Dancing_Script } from 'next/font/google'
import { forwardRef } from 'react'
import { useFormContext } from 'react-hook-form'

const cursive = Dancing_Script({
  preload: true,
  display: 'swap',
  weight: ['500'],
  subsets: ['latin'],
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

export const FormSignature = forwardRef<HTMLElement, { name: string }>(function FormSignature({ name }, ref) {
  const { watch } = useFormContext()

  const value = watch(name)

  return (
    <Typography ref={ref} fontFamily={cursive.style.fontFamily} fontSize="3rem">
      {value}
    </Typography>
  )
})
