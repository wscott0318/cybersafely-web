export const isEveryElementSameInArray = (elementsArray: Array<any>) => {
  if (!elementsArray || !elementsArray.length) return false

  const el = elementsArray[0]

  for (let i = 1; i < elementsArray.length; i++) {
    if (el !== elementsArray[i]) return false
  }

  return true
}
