import CancelIcon from '@mui/icons-material/Cancel'
import CheckIcon from '@mui/icons-material/CheckCircle'
import PendingIcon from '@mui/icons-material/Pending'
import { Chip, Tooltip } from '@mui/material'
import { useMemo } from 'react'
import { UserRoleStatusEnum, UserRoleTypeEnum } from '../../schema'

export function userRoleDisplayText(role: UserRoleTypeEnum) {
  switch (role) {
    case 'STAFF':
      return 'Staff'
    case 'ADMIN':
      return 'Admin'
    case 'COACH':
      return 'Coach'
    case 'STUDENT':
      return 'Student'
    case 'PARENT':
      return 'Parent'
  }
}

type UserRoleProps = {
  type: UserRoleTypeEnum
  status: UserRoleStatusEnum
  onDelete?: () => void
}

export function UserRole({ type, status, onDelete }: UserRoleProps) {
  const label = useMemo(() => userRoleDisplayText(type), [type])

  const color = useMemo(() => {
    switch (status) {
      case 'PENDING':
        return 'default'
      case 'ACCEPTED':
        return 'primary'
      case 'DECLINED':
        return 'error'
    }
  }, [status])

  const icon = useMemo(() => {
    switch (status) {
      case 'PENDING':
        return <PendingIcon />
      case 'ACCEPTED':
        return <CheckIcon />
      case 'DECLINED':
        return <CancelIcon />
    }
  }, [status])

  const title = useMemo(() => {
    switch (status) {
      case 'PENDING':
        return 'Pending'
      case 'ACCEPTED':
        return 'Accepted'
      case 'DECLINED':
        return 'Declined'
    }
  }, [status])

  return (
    <Tooltip title={title}>
      <Chip label={label} color={color} icon={icon} onDelete={onDelete} />
    </Tooltip>
  )
}
