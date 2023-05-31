import { Chip } from '@mui/material'
import { useMemo } from 'react'
import { SocialNameEnum } from '../../schema'
import { SocialConfig } from '../../utils/social'

type PlatformChipProps = {
  platform: SocialNameEnum
}

export function PlatformChip({ platform }: PlatformChipProps) {
  const value = useMemo(() => SocialConfig[platform], [platform])

  if (!value) {
    return null
  }

  return (
    <Chip
      variant="filled"
      label={value.name}
      sx={{ background: value.color }}
      icon={<img alt={value.name} src={value.icon} height={14} style={{ marginLeft: 6 }} />}
    />
  )
}
