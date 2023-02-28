import { Box, CircularProgress, InputAdornment, Stack, Typography } from '@mui/material'
import { passwordStrength } from 'check-password-strength'
import { useMemo } from 'react'

export function checkPasswordStrength(password: string) {
  return (passwordStrength(password).id / 3) * 100
}

type PasswordStrengthProps = {
  password?: string | null
}

export function PasswordStrength(props: PasswordStrengthProps) {
  const strength = useMemo(() => {
    if (!props.password) return 0
    return checkPasswordStrength(props.password)
  }, [props.password])

  const color = useMemo(() => {
    if (strength < 50) return 'error'
    return 'success'
  }, [strength])

  const text = useMemo(() => {
    if (strength < 50) return 'Too Weak'
    return 'Good'
  }, [strength])

  if (!props.password) {
    return null
  }

  return (
    <InputAdornment position="end">
      <Stack spacing={0.5} direction="row" alignItems="center">
        <Box position="relative">
          <CircularProgress
            size={16}
            value={100}
            color={color}
            thickness={4.5}
            variant="determinate"
            sx={{ position: 'absolute', opacity: 0.25 }}
          />
          <CircularProgress
            size={16}
            color={color}
            thickness={4.5}
            value={strength}
            variant="determinate"
            sx={{ display: 'block' }}
          />
        </Box>
        <Typography color={color + '.main'}>{text}</Typography>
      </Stack>
    </InputAdornment>
  )
}
