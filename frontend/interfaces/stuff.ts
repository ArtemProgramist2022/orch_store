import { CategoryItem } from "./categories"
import { GetParams } from "./common"

export interface StuffItem {
  id: number
  name: string
  description: string
  cost: number
  count_on_warehouse: number
  category_id: number | null
  category?: CategoryItem
  stuff_link?: string
}

export interface NewStuffItem extends Omit<StuffItem, 'id' | 'category' | 'stuff_link'> {
  photo?: string
}

export interface StuffGetParams extends Partial<GetParams> {
  category_id: number | string
}