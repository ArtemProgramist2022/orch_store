import { StuffItem } from '@/interfaces/stuff'

export interface CartItem {
  id: number
  user_id:number
  stuff_id: number
  stuff?: StuffItem
  stuff_count: number
}