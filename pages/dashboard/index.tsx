import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useProfileQuery } from '../../types/graphql'

export default function Dashboard() {
  const router = useRouter()
  const { data } = useProfileQuery()

  useEffect(() => {
    if (!data) return

    const user = data.profile

    const staff = user.roles.find((e) => e.role === 'STAFF')
    const coach = user.roles.find((e) => e.role === 'COACH')
    const athlete = user.roles.find((e) => e.role === 'ATHLETE')
    const parent = user.roles.find((e) => e.role === 'PARENT')

    if (staff) {
      router.replace('/dashboard/staff/home')
    } else if (coach && coach.__typename === 'TeamRole') {
      localStorage.setItem('teamId', coach.team.id)
      router.replace('/dashboard/coach/home')
    } else if (athlete && athlete.__typename === 'TeamRole') {
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
