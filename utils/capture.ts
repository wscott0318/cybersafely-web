import html2canvas from 'html2canvas'

export async function captureElementToBlob(element: HTMLElement) {
  const canvas = await html2canvas(element)

  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob)
      } else {
        reject(new Error('Capture error'))
      }
    })
  })
}
