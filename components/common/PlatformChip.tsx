import { Chip } from '@mui/material'
import { useMemo } from 'react'
import { PlatformEnum } from '../../schema'

const Platforms: Record<string, { name: string; color: string; logo: string }> = {
  TWITTER: {
    name: 'Twitter',
    color: '#1d9bf0',
    logo: '/images/logos/twitter.svg',
  },
}

type PlatformChipProps = {
  platform: PlatformEnum
}

export function PlatformChip({ platform }: PlatformChipProps) {
  const value = useMemo(() => Platforms[platform], [platform])

  if (!value) {
    return null
  }

  return (
    <Chip
      variant="filled"
      label={value.name}
      sx={{ background: value.color }}
      icon={<img alt={value.name} src={value.logo} height={14} style={{ marginLeft: 6 }} />}
    />
  )
}
