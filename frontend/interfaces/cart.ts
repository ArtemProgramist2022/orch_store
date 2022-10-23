import { IStuff } from '@/interfaces/stuff'

export interface ICartItem{
    id: number
    user_id:number
    stuff_id: number
    stuff: IStuff
    stuff_count: number
}

export interface INewCartItem{
    stuff_id: number
    stuff_count: number
}

export interface IUpdateCartItem{
    stuff_count: number
}
