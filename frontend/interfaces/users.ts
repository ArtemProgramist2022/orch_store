
export interface ILoginForm {
    phone: string,
    password: string
}

export interface IConfirmForm {
    phone: string,
    code: string
}

export interface IRegisterForm {
    phone: string,
    name: string,
    password: string,
    confirm_password: string,
    code: string
}

export interface IMeForm {
    token: string,
    me: User
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
