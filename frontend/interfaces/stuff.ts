
export interface IStuff{
    id: number
    name: string
    description: string
    cost: number
    count_on_warehouse: number
    category_id: number
    category?: string
}


export interface IStuffGetParams {
    category_id?: number
    page: number
    limit: number
}