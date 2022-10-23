import os
import random
import string

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
from models.categories import Category


class BaseStuff(BaseModel):
    name: str
    description: str
    cost: Decimal
    count_on_warehouse: int
    category_id: int


class Stuff(BaseStuff):
    id: int
    category: Optional[Category]
    stuff_link: Optional[str]


class NewStuff(BaseStuff):
    photo: Optional[str] = None


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


def stuff_image_file_path(post_id: int, extension) -> str:
    post_id_padded = str(post_id).zfill(12)
    return os.path.join(
        post_id_padded[-8:-6],
        post_id_padded[-6:-4],
        post_id_padded[-4:-2],
        post_id_padded[-2],
        str(random.choice(string.ascii_lowercase)),
        f'{post_id}{extension}'
    )


def stuff_image_absolute_file_path(stuff_image_folder: str, path: str) -> str:
    return os.path.join(stuff_image_folder, path)
