export function getDate (str: string | null, server_format = false) {
  const date = str ? new Date(str) : new Date()
  const year = date.getFullYear();
  const month = addLeadingZero(date.getMonth() + 1)
  const day = addLeadingZero(date.getDate())

  if (server_format) {
    return `${year}-${month}-${day}`
  } else {
    return `${day}.${month}.${year}`
  }
}

export function addLeadingZero (num: number) {
  return num < 10 ? `0${num}` : num
}