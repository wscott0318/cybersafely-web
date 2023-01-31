import { Button, Divider, Link, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { CoverLayout } from '../../components/common/CoverLayout'
import { NextLink } from '../../components/common/NextLink'
import { Config } from '../../helpers/config'
import { AnyRole, ParentRole, TeamRole, useProfileQuery } from '../../types/graphql'
import { StorageManager } from '../../utils/storage'

export default function Dashboard() {
  const router = useRouter()

  const { data } = useProfileQuery()

  const [error, setError] = useState(false)

  useEffect(() => {
    if (!data) return

    const user = data.profile

    const staff = user.roles.find((e) => e.role === 'STAFF' && e.status === 'ACCEPTED') as AnyRole | undefined
    const admin = user.roles.find((e) => e.role === 'ADMIN' && e.status === 'ACCEPTED') as TeamRole | undefined
    const coach = user.roles.find((e) => e.role === 'COACH' && e.status === 'ACCEPTED') as TeamRole | undefined
    const athlete = user.roles.find((e) => e.role === 'ATHLETE' && e.status === 'ACCEPTED') as TeamRole | undefined
    const parent = user.roles.find((e) => e.role === 'PARENT' && e.status === 'ACCEPTED') as ParentRole | undefined

    if (staff) {
      router.replace('/dashboard/staff/home')
    } else if (admin) {
      StorageManager.set('teamId', admin.team.id)
      router.replace('/dashboard/admin/home')
    } else if (coach) {
      StorageManager.set('teamId', coach.team.id)
      router.replace('/dashboard/coach/home')
    } else if (athlete) {
      StorageManager.set('teamId', athlete.team.id)
      router.replace('/dashboard/athlete/home')
    } else if (parent) {
      router.replace('/dashboard/parent/home')
    } else {
      setError(true)
    }
  }, [data, router])

  if (!error) {
    return null
  }

  return (
    <CoverLayout>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h4">No user role!</Typography>
          <Typography>
            The current logged in user, <b>{data?.profile.email}</b>, does not have any valid roles.
          </Typography>
        </Box>
        <NextLink href="/auth/login">
          <Button size="large">Login Again</Button>
        </NextLink>
        <Divider />
        <Typography>
          Something wrong? <Link href={'mailto:' + Config.email.support}>Report an issue</Link>
        </Typography>
      </Stack>
    </CoverLayout>
  )
}
