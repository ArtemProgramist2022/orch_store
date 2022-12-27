import { CartItem } from "~/interfaces/cart";

export function getTotalCost (items: CartItem[]) {
  return items.reduce((total, item) => total + (item.stuff_count * (item.stuff?.cost || 0)), 0)
}