import { useCallback, useState } from 'react'
import { usePrepareUploadMutation } from '../schema'

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
      input.addEventListener('change', () => {
        resolve(input.files?.[0])
      })

      input.addEventListener('cancel', () => {
        resolve(undefined)
      })
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

  const [prepareForUpload] = usePrepareUploadMutation()

  const upload = useCallback(async (body: File | Blob | Buffer) => {
    try {
      setLoading(false)

      const { data } = await prepareForUpload()

      if (data) {
        const { id, url, method, headers } = data.prepareUpload

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

type UploadOptions = {
  accept?: Accept
  resize?: number
}

export function useFileUpload() {
  const { pick } = useFilePicker()
  const { upload: justUpload } = useUpload()

  const [loading, setLoading] = useState(false)

  const upload = useCallback(async (options?: UploadOptions) => {
    try {
      setLoading(true)

      const file = await pick(options?.accept)

      if (file) {
        if (typeof options?.resize === 'number') {
          const { readAndCompressImage } = require('browser-image-resizer')
          const blob = await readAndCompressImage(file, {
            quality: 0.75,
            mimeType: 'image/jpeg',
            maxWidth: options.resize * window.devicePixelRatio,
            maxHeight: options.resize * window.devicePixelRatio,
          })

          return await justUpload(blob)
        }

        return await justUpload(file)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  return { upload, loading }
}
