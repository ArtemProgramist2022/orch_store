import { CategoryItem } from "./categories"

export interface StuffItem {
  id: number
  name: string
  description: string
  cost: number
  count_on_warehouse: number
  category_id: number
  category?: CategoryItem
  stuff_link?: string
}

export interface StuffGetParams {
  page?: number,
  limit?: number,
  category_id: number
}