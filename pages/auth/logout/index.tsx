import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Logout() {
  const router = useRouter()

  useEffect(() => {
    localStorage.clear()
    router.replace('/auth/login')
  }, [])

  return null
}
