import { CartItem } from "./cart";
import { StuffItem } from "./stuff";
import { User } from "./users";

export interface Order {
  id: number;
  en: boolean;
  delivery_address: string;
  delivery_date: string;
  delivery_time: string;
  items: CartItem[];
  user_id: number | null;
  user: User;
  status: OrderStatus;
}

export interface OrderGetParams {
  user_id?: string,
  order_status?: OrderStatus,
  delivery_date?: string
}

export enum OrderStatus {
  WAIT_PAID = 'wait_paid',
  PAID = 'paid',
  DELIVERY = 'delivery',
  DONE = 'done'
}

export enum OrderStatusRU {
  wait_paid = 'Ожидает оплаты',
  paid = 'Оплачено',
  delivery = 'Доставка',
  done = 'Доставлено'
}