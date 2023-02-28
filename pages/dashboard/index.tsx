import { Box, Button, Divider, Link, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { CoverLayout } from '../../components/common/CoverLayout'
import { NextLink } from '../../components/common/NextLink'
import { Config } from '../../helpers/config'
import { SchoolRole, useMyUserQuery } from '../../schema'
import { StorageManager } from '../../utils/storage'

export default function Dashboard() {
  const router = useRouter()

  const { data } = useMyUserQuery({
    variables: {
      id: StorageManager.get('userId')!,
    },
  })

  const [error, setError] = useState(false)

  useEffect(() => {
    if (!data) return

    const { user } = data

    const staff = user.roles.find((e) => e.type === 'STAFF')
    const admin = user.roles.find((e) => e.type === 'ADMIN') as SchoolRole | undefined
    const coach = user.roles.find((e) => e.type === 'COACH') as SchoolRole | undefined
    const athlete = user.roles.find((e) => e.type === 'ATHLETE') as SchoolRole | undefined
    const parent = user.roles.find((e) => e.type === 'PARENT')

    if (staff) {
      router.replace('/dashboard/staff/home')
    } else if (admin) {
      StorageManager.set('schoolId', admin.school.id)
      router.replace('/dashboard/admin/home')
    } else if (coach) {
      StorageManager.set('schoolId', coach.school.id)
      router.replace('/dashboard/coach/home')
    } else if (athlete) {
      StorageManager.set('schoolId', athlete.school.id)
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
            The current logged in user, <b>{data?.user.email}</b>, does not have any valid roles.
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
