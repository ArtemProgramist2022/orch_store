export function getRuble () {
  return '&#8381;'
}

export function goBack (path: string) {
  const dividedPath = path.split('/')
  return dividedPath.slice(0, dividedPath.length - 1).join('/')
}