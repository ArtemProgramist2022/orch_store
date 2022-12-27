from fastapi import (
    APIRouter,
    Depends,
    Form
)
from misc import handlers,config
from services.orch_store.depends.admin_area import check_rule
from db import stuff as stuff_db
from models import stuff as stuff_models
from misc.db import (
    Connection,
)

from misc.fastapi.depends.conf import get as get_conf
from misc.fastapi.depends.db import get as get_db
import logging

logger = logging.getLogger(__name__)

router = APIRouter(
    tags=["Stuff"],
    prefix='/stuff'
)


@router.get('/', response_model=stuff_models.StuffListSuccessResponse)
async def get_stuff_list(
        category_id: int = None,
        stuff_name: str = None,
        page: int = 1,
        limit: int = 20,
        conn: Connection = Depends(get_db)
):
    limit = min(50, limit)
    page = max(1, page)
    return stuff_models.StuffListSuccessResponse(
        data=stuff_models.StuffList(
            items=await stuff_db.get_stuff_list(
                category_id=category_id,
                page=page,
                limit=limit,
                stuff_name=stuff_name,
                conn=conn
            ),
            total=await stuff_db.get_total(
                category_id=category_id,
                stuff_name=stuff_name,
                conn=conn
            ),
            limit=limit,
            page=page
        )
    )


@router.post(
    '/',
    response_model=stuff_models.StuffSuccessResponse,
    dependencies=[Depends(check_rule)]
)
async def add_stuff_item(
        model: stuff_models.NewStuff,
        conn: Connection = Depends(get_db),
        conf: dict = Depends(get_conf)
):
    data = await stuff_db.add_stuff_item(
        new_stuff=model,
        conn=conn,
        stuff_image_folder=config.stuff_images_folder(conf),
        stuff_link_base=conf['urls']['stuff']
    )
    if data:
        return stuff_models.StuffSuccessResponse(
            data=data
        )
    return await handlers.error_400(
        'Не получилось добавить товар'
    )


@router.delete(
    "/{stuff_id}",
    response_model=stuff_models.StuffSuccessResponse,
    dependencies=[Depends(check_rule)]
)
async def delete_stuff_item(
        stuff_id: int,
        conn: Connection = Depends(get_db)
):
    data = await stuff_db.delete_stuff_item(
        stuff_id=stuff_id,
        conn=conn
    )
    if data:
        return stuff_models.StuffSuccessResponse(
            data=data
        )
    return await handlers.error_404('Товар не найден')
