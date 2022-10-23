
export interface ILoginForm {
    email: string,
    password: string
}

export interface IConfirmForm {
    email: string,
    code: string
}

export interface IRegisterForm {
    email: string,
    name: string,
    password: string
}

export interface IMeForm {
    token: string,
    me: User
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
