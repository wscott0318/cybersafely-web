import { useApolloClient } from '@apollo/client'
import { Box, Button, Divider, Link, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { CoverLayout } from '../../components/common/CoverLayout'
import { NextLink } from '../../components/common/NextLink'
import { Config } from '../../helpers/config'
import { MyUserDocument, MyUserQuery, MyUserQueryVariables, SchoolRole } from '../../schema'
import { StorageManager } from '../../utils/storage'

export default function Dashboard() {
  const router = useRouter()

  const client = useApolloClient()

  const [error, setError] = useState(false)

  useEffect(() => {
    async function check() {
      try {
        const id = StorageManager.get('userId')

        if (typeof id === 'string') {
          const { data } = await client.query<MyUserQuery, MyUserQueryVariables>({
            variables: { id },
            query: MyUserDocument,
          })

          const { user } = data!

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
        } else {
          throw new Error('No user')
        }
      } catch (error) {
        console.error(error)
        router.replace('/auth/login')
      }
    }

    check()
  }, [])

  if (!error) {
    return null
  }

  return (
    <CoverLayout>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h4">No user role!</Typography>
          <Typography>The current logged in user does not have any valid roles.</Typography>
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
