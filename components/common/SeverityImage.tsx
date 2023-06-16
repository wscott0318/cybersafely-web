import Image from 'next/image'
import { useMemo } from 'react'
import { AnalysisItemSeverityEnum } from '../../schema'

type Props = {
  severity: AnalysisItemSeverityEnum
  size?: number
}

const URLs: Record<AnalysisItemSeverityEnum, string> = {
  NONE: '/images/severity/none.png',
  LOW: '/images/severity/low.png',
  HIGH: '/images/severity/high.png',
}

export function SeverityImage({ severity, size = 32 }: Props) {
  const src = useMemo(() => URLs[severity], [severity])

  return <Image alt={severity} src={src} width={size} height={size} />
}
