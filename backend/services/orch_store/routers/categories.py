from fastapi import (
    APIRouter,
    Depends
)
from services.orch_store.depends.admin_area import check_rule
from models import categories as cat_models
from db import categories as cat_db
from misc.db import Connection
from misc.fastapi.depends.db import get as get_db
import logging

logger = logging.getLogger(__name__)

router = APIRouter(
    tags=['Categories'],
    prefix='/categories'
)


@router.get('', response_model=cat_models.CategoriesSuccessResponse)
async def get_categories(
        conn: Connection = Depends(get_db)
):
    return cat_models.CategoriesSuccessResponse(
        data=await cat_db.get_categories(conn)
    )


@router.post(
    "",
    response_model=cat_models.CategorySuccessResponse,
    dependencies=[Depends(check_rule)]
)
async def add_category(
        new_category: cat_models.NewCategory,
        conn: Connection = Depends(get_db)
):
    return cat_models.CategorySuccessResponse(
        data=await cat_db.add_category(
            model=new_category,
            conn=conn
        )
    )


@router.post(
    "/{pk}",
    response_model=cat_models.CategorySuccessResponse,
    dependencies=[Depends(check_rule)]
)
async def update_category(
        pk: int,
        update_model: cat_models.UpdateCategory,
        conn: Connection = Depends(get_db)
):
    return cat_models.CategorySuccessResponse(
        data=await cat_db.update_category(
            model=update_model,
            conn=conn,
            pk=pk
        )
    )


@router.delete(
    '/{pk}',
    response_model=cat_models.CategorySuccessResponse,
    dependencies=[Depends(check_rule)]
)
async def delete_category(
        pk: int,
        conn: Connection = Depends(get_db)
):
    return cat_models.CategorySuccessResponse(
        data=await cat_db.delete_category(
            pk=pk,
            conn=conn
        )
    )
