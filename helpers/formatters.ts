import { Role } from '../types/graphql'

export function roleDisplayTitle(role: Role) {
  switch (role) {
    case 'STAFF':
      return 'Staff'
    case 'COACH':
      return 'Coach'
    case 'ATHLETE':
      return 'Athlete'
    case 'PARENT':
      return 'Parent'
  }
}
