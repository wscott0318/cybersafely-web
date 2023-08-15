import { Button, MenuItem, Select, Stack, Typography } from '@mui/material'
import NextImage from 'next/image'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { useLogoUrl } from '../../helpers/hooks'
import { SchoolRole, useMyUserLazyQuery } from '../../schema'
import { isEveryElementSameInArray } from '../../utils/array'
import { filterUserRoles } from '../../utils/role'
import { StorageManager } from '../../utils/storage'

function Center({ children }: { children: React.ReactNode }) {
  return (
    <Stack minHeight="100vh" alignItems="center" justifyContent="center">
      {children}
    </Stack>
  )
}

export default function Dashboard() {
  const router = useRouter()
  const logoUrl = useLogoUrl()

  const [role, setRole] = useState('')

  const [fetch, { data, loading }] = useMyUserLazyQuery({
    onError: (error) => {
      console.error(error)
      localStorage.clear()
      router.replace('/auth/login')
    },
  })

  useEffect(() => {
    const id = StorageManager.get('userId')!
    fetch({ variables: { id } })
  }, [])

  const onSelect = useCallback(
    (id: string) => {
      const userRole = data!.user.roles.find((e) => e.id === id)!

      StorageManager.set('roleId', userRole.id)

      switch (userRole.type) {
        case 'STAFF':
          return router.push('/dashboard/staff/home')
        case 'ADMIN':
          return router.push('/dashboard/admin/home')
        case 'COACH':
          return router.push('/dashboard/coach/home')
        case 'STUDENT':
          return router.push('/dashboard/student/home')
        case 'PARENT':
          return router.push('/dashboard/parent/home')
      }
    },
    [data]
  )

  useEffect(() => {
    const userRoles = data?.user.roles

    if (data && isEveryElementSameInArray(userRoles!.map((role) => role.type))) {
      onSelect(data.user.roles[0].id)
    }
  }, [data, onSelect])

  if (loading || !data) {
    return (
      <Center>
        <Typography>Checking user role...</Typography>
      </Center>
    )
  }

  if (data.user.roles.length === 0) {
    return (
      <Center>
        <Typography>No user roles found</Typography>
      </Center>
    )
  }

  return (
    <Center>
      <Stack spacing={1} width={300}>
        <Stack width={300} alignItems="center" sx={{ marginBottom: `2rem` }}>
          <NextImage alt="Logo" width={243} height={113} src={logoUrl} />
        </Stack>

        <Typography>Select an user role:</Typography>
        <Select variant="outlined" onChange={(e) => setRole(e.target.value as string)}>
          {filterUserRoles(data.user.roles).map((userRole) => {
            switch (userRole.type) {
              case 'STAFF':
                return <MenuItem value={userRole.id}>Staff</MenuItem>
              case 'ADMIN': {
                const schoolRole = userRole as SchoolRole
                return <MenuItem value={userRole.id}>Admin at {schoolRole.school.name}</MenuItem>
              }
              case 'COACH': {
                const schoolRole = userRole as SchoolRole
                return <MenuItem value={userRole.id}>Coach at {schoolRole.school.name}</MenuItem>
              }
              case 'STUDENT': {
                const schoolRole = userRole as SchoolRole
                return <MenuItem value={userRole.id}>Student at {schoolRole.school.name}</MenuItem>
              }
              case 'PARENT':
                return <MenuItem value={userRole.id}>Parent</MenuItem>
            }
          })}
        </Select>

        <Button sx={{ py: 2 }} size="large" disabled={!role || role === ''} onClick={() => onSelect(role)}>
          Go to Portal
        </Button>
      </Stack>
    </Center>
  )
}
