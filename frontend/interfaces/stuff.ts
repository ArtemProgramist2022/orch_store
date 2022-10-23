
export interface IStuff{
    id: number
    name: string
    description: string
    cost: number
    count_on_warehouse: number
    category_id: number
    category?: string
    stuff_link?: string
}

export interface IStuffGetParams {
    category_id?: number
    page: number
    limit: number
}

export interface INewStuff {
    name: string
    description: string
    cost: number
    count_on_warehouse: number
    category_id: number
    photo: string
}
