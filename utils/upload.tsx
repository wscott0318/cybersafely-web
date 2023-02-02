import { useCallback, useState } from 'react'
import { usePrepareForUploadMutation } from '../types/graphql'

type Accept = 'image/*'

export function useFilePicker() {
  const pick = useCallback(async (accept?: Accept) => {
    const input = document.createElement('input')
    input.style.display = 'none'
    input.type = 'file'

    if (accept) {
      input.accept = accept
    }

    const promise = new Promise<File | undefined>((resolve) => {
      let resolved = false

      input.addEventListener('change', () => {
        const file = input.files?.[0]
        resolved = true
        resolve(file)
      })

      function didFocus() {
        setTimeout(() => {
          if (!resolved) {
            resolved = true
            resolve(undefined)
          }
        }, 500)
      }

      window.addEventListener('focus', didFocus, { once: true })
      window.addEventListener('mousemove', didFocus, { once: true })
    })

    input.click()
    const file = await promise
    input.remove()

    return file
  }, [])

  return { pick }
}

export function useUpload() {
  const [loading, setLoading] = useState(false)

  const [prepareForUpload] = usePrepareForUploadMutation()

  const upload = useCallback(async (body: File) => {
    try {
      setLoading(false)

      const { data } = await prepareForUpload()

      if (data) {
        const { id, url, method, headers } = data.prepareForUpload

        await fetch(url, {
          body,
          method,
          headers: headers.reduce((prev, curr) => {
            prev[curr.key] = curr.value
            return prev
          }, {} as Record<string, string>),
        })

        return id
      }
    } finally {
      setLoading(false)
    }
  }, [])

  return { upload, loading }
}
