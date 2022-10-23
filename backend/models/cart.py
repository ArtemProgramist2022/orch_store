from pydantic import BaseModel
from models import stuff, base
from typing import List, Optional


class CartItem(BaseModel):
    id: int
    user_id: int
    stuff_id: int
    stuff: Optional[stuff.Stuff]
    stuff_count: int


class NewCartItem(BaseModel):
    stuff_id: int
    stuff_count: int


class UpdateCartItem(BaseModel):
    stuff_count: int


class CartItemSuccessResponse(base.SuccessResponse):
    data: Optional[CartItem]


class CartListSuccessResponse(base.SuccessResponse):
    data: List[CartItem]
