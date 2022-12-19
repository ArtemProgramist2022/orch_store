from misc.db import Connection
from misc.session import Session
from fastapi import APIRouter, Depends
from models import cart as cart_models
from db import (
    cart as cart_db,
    stuff
)
from misc.fastapi.depends.db import get as get_db
from misc.fastapi.depends.session import get as get_session
from misc import handlers
import logging

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix='/cart',
    tags=['Cart']
)


@router.get(
    '/',
    response_model=cart_models.CartListSuccessResponse
)
async def get_user_cart(
        session: Session = Depends(get_session),
        conn: Connection = Depends(get_db)
):
    if session.user.is_authenticated:
        data = await cart_db.get_user_cart(
            user_id=session.user.id,
            conn=conn
        )
        return cart_models.CartListSuccessResponse(
            data=data
        )

    return await handlers.error_401(
        'Для просмотра корзины необходимо авторизоваться'
    )


@router.post(
    '/',
    response_model=cart_models.CartItemSuccessResponse
)
async def add_stuff_to_cart(
        model: cart_models.NewCartItem,
        session: Session = Depends(get_session),
        conn: Connection = Depends(get_db)
):
    if session.user.is_authenticated:
        if await stuff.get_stuff_item(
            pk=model.stuff_id,
            conn=conn
        ):
            data = await cart_db.add_stuff_to_cart(
                user_id=session.user.id,
                model=model,
                conn=conn
            )
            return cart_models.CartItemSuccessResponse(
                data=data
            )
        return await handlers.error_404(
            "Нет такого товара"
        )
    return await handlers.error_401(
        "Вы не авторизованы"
    )


@router.post(
    '/{cart_item_id}',
    response_model=cart_models.CartItemSuccessResponse
)
async def update_stuff_count_in_cart(
        cart_item_id: int,
        model: cart_models.UpdateCartItem,
        session: Session = Depends(get_session),
        conn: Connection = Depends(get_db)
):
    if session.user.is_authenticated:
        data = await cart_db.update_stuff_in_cart(
            pk=cart_item_id,
            model=model,
            conn=conn
        )
        if data:
            return cart_models.CartItemSuccessResponse(
                data=data
            )
        return handlers.error_404(
            "Нет такого товара"
        )
    return await handlers.error_401(
        'Вы не авторизованы'
    )


@router.delete(
    '/{cart_item_id}',
    response_model=cart_models.CartItemSuccessResponse
)
async def remove_stuff_from_cart(
        cart_item_id: int,
        session: Session = Depends(get_session),
        conn: Connection = Depends(get_db)
):
    if session.user.is_authenticated:
        data = await cart_db.delete_stuff_from_cart(
            pk=cart_item_id,
            conn=conn
        )
        if data:
            return cart_models.CartItemSuccessResponse(
                data=data
            )
        return await handlers.error_404(
            "Нет такого товара"
        )
    return await handlers.error_401(
        "Вы не авторизованы"
    )
