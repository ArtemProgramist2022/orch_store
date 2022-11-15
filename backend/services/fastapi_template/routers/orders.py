import datetime

from fastapi import APIRouter, Depends
from models import orders
from typing import (
    Optional,
    List
)
from db import order as orders_db
from misc.db import Connection
from misc.session import Session
from misc.fastapi.depends.session import get as get_session
from misc.fastapi.depends.db import get as get_db
from misc import handlers
import logging

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix='/orders',
    tags=['Orders']
)


@router.get('/', response_model=orders.OrdersListSuccessResponse)
async def get_orders(
        user_id: int = None,
        order_status: orders.OrderStatus = None,
        delivery_date: datetime.date = None,
        conn: Connection = Depends(get_db),
        session: Session = Depends(get_session)
):
    if session.user.is_authenticated:
        if session.user.is_admin or check_user(
                user_id=user_id,
                current_user_id=session.user.id
        ):
            result = await orders_db.get_orders_list(
                conn=conn,
                user_id=user_id,
                order_status=order_status,
                delivery_date=delivery_date
            )
            return orders.OrdersListSuccessResponse(
                data=result
            )
        return await handlers.error_403()
    return await handlers.error_401()


@router.post('/', response_model=orders.OrderSuccessResponse)
async def create_order(
        model: orders.NewOrder,
        conn: Connection = Depends(get_db),
        session: Session = Depends(get_session)
):
    if session.user.is_authenticated is False:
        return await handlers.error_401()

    result = await orders_db.create_order(
        user_id=session.user.id,
        model=model,
        conn=conn
    )
    return orders.OrderSuccessResponse(
        data=result
    )


def check_user(
        user_id: Optional[int],
        current_user_id: int
) -> bool:
    if user_id is None:
        return False
    if user_id == current_user_id:
        return True
    else:
        return False
