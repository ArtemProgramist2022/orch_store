export interface LoginForm {
  email: string,
  password: string
}

export interface ConfirmForm {
  email: string,
  code: string
}

export interface RegisterForm {
  email: string,
  name: string,
  password: string,
  confirmPassword: string,
  code: string
}

export interface MeForm {
  token: string,
  me: User | null
}

export interface User {
  id: number,
  en: boolean,
  name: string,
  email: string,
  is_admin: boolean,
  ctime: string |null
  dtime: string | null,
  atime: string | null
}
