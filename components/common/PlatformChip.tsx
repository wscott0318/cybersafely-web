import { Chip } from '@mui/material'
import { useMemo } from 'react'
import { PlatformEnum } from '../../schema'

const Platforms = {
  TWITTER: {
    name: 'Twitter',
    color: '#1d9bf0',
    logo: '/images/logos/twitter.svg',
  },
  UNKNOWN: {
    name: 'Unknown',
    color: '#000',
    logo: '/images/logos/unknown.svg',
  },
} satisfies { [K in PlatformEnum]: { name: string; color: string; logo: string } }

type PlatformChipProps = {
  platform: PlatformEnum
}

export function PlatformChip({ platform }: PlatformChipProps) {
  const { name, color, logo } = useMemo(() => Platforms[platform], [platform])

  return (
    <Chip
      label={name}
      variant="filled"
      sx={{ background: color }}
      icon={<img alt={name} src={logo} height={14} style={{ marginLeft: 6 }} />}
    />
  )
}
