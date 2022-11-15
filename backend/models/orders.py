from pydantic import BaseModel
from typing import (
    List,
    Optional
)
from models import base, cart, users
from enum import Enum
from datetime import date


class OrderStatus(str, Enum):
    WAIT_PAID = 'wait_paid'
    PAID = 'paid'
    DELIVERY = 'delivery'
    DONE = 'done'


class Order(BaseModel):
    id: int
    en: bool
    delivery_address: str
    delivery_date: Optional[date]
    delivery_time: Optional[str]
    items: Optional[List[cart.CartItem]]
    user_id: int
    user: Optional[users.User]
    status: OrderStatus


class NewOrder(BaseModel):
    delivery_address: str
    items: List[int]


class UpdateOrder(BaseModel):
    delivery_date: Optional[date]
    delivery_time: Optional[str]
    status: Optional[OrderStatus]


class OrderSuccessResponse(base.SuccessResponse):
    data: Optional[Order]


class OrdersListSuccessResponse(base.SuccessResponse):
    data: Optional[List[Order]]
