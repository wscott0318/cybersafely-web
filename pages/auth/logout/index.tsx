import { useEffect } from 'react'
import { useUser } from '../../../utils/context/auth'

export default function Logout() {
  const { logout } = useUser()

  useEffect(() => {
    logout()
  }, [])

  return null
}
