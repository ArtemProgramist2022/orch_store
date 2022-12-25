export function isAuth (user: Record<string, unknown> | null) {
  return user && user.id
}

export function isAdmin (user: Record<string, unknown> | null) {
  return user && user.is_admin
}

