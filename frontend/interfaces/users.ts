export interface LoginForm {
  phone: string,
  password: string
}

export interface ConfirmForm {
  phone: string,
  code: string
}

export interface RegisterForm {
  phone: string,
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
  phone: string,
  is_admin: boolean,
  ctime: string |null
  dtime: string | null,
  atime: string | null
}
