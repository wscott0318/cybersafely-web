import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { AnyUserRole, ParentRole, TeamRole, useProfileQuery } from '../../types/graphql'

export default function Dashboard() {
  const router = useRouter()
  const { data } = useProfileQuery()

  useEffect(() => {
    if (!data) return

    const user = data.profile

    const staff = user.roles.find((e) => e.role === 'STAFF') as AnyUserRole | undefined
    const coach = user.roles.find((e) => e.role === 'COACH') as TeamRole | undefined
    const athlete = user.roles.find((e) => e.role === 'ATHLETE') as TeamRole | undefined
    const parent = user.roles.find((e) => e.role === 'PARENT') as ParentRole | undefined

    if (staff) {
      router.replace('/dashboard/staff/home')
    } else if (coach) {
      localStorage.setItem('teamId', coach.team.id)
      router.replace('/dashboard/coach/home')
    } else if (athlete) {
      localStorage.setItem('teamId', athlete.team.id)
      router.replace('/dashboard/athlete/home')
    } else if (parent) {
      router.replace('/dashboard/parent/home')
    } else {
      throw new Error('Cannot redirect user')
    }
  }, [data])

  return null
}
