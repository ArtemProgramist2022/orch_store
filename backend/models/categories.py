from pydantic import BaseModel
from typing import List, Optional
from models.base import ListData, SuccessResponse


class Category(BaseModel):
    id: int
    name: str


class NewCategory(BaseModel):
    name: str


class UpdateCategory(BaseModel):
    name: Optional[str]


class CategoriesSuccessResponse(SuccessResponse):
    data: Optional[List[Category]]


class CategorySuccessResponse(SuccessResponse):
    data: Category
