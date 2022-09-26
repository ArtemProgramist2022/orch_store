from pydantic import BaseModel
from typing import (
    Optional,
    List
)
from decimal import Decimal
from models.base import (
    SuccessResponse,
    ListData
)


class BaseStuff(BaseModel):
    name: str
    description: str
    cost: Decimal
    count_on_warehouse: int
    category_id: int
    category: Optional[str]


class Stuff(BaseStuff):
    id: int


class NewStuff(BaseStuff):
    pass


class UpdateStuff(BaseModel):
    name: Optional[str]
    description: Optional[str]
    cost: Optional[Decimal]
    count_on_warehouse: Optional[int]
    category_id: Optional[int]


class StuffSuccessResponse(SuccessResponse):
    data: Optional[Stuff]


class StuffList(ListData):
    items: Optional[List[Stuff]]


class StuffListSuccessResponse(SuccessResponse):
    data: StuffList
