import { ChipProps } from '@mui/material'
import { AnalysisItemSeverityEnum } from '../schema'

export function severityChipProps(severity: AnalysisItemSeverityEnum): ChipProps {
  switch (severity) {
    case 'HIGH':
      return {
        label: severity,
        color: 'error',
      }
    case 'LOW':
      return {
        label: severity,
        color: 'warning',
      }
    case 'NONE':
      return {
        label: severity,
        color: 'default',
      }
  }
}
