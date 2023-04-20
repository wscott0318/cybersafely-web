import { Typography } from '@mui/material'
import { Pacifico } from 'next/font/google'
import { forwardRef } from 'react'
import { useFormContext } from 'react-hook-form'

const cursive = Pacifico({
  preload: true,
  display: 'swap',
  weight: ['400'],
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
