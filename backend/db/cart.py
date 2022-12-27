from misc.db import (
    Connection,
    record_to_model,
    record_to_model_list
)
from models import (
    cart,
    stuff
)
from typing import (
    Optional,
    List
)
from db import (
    stuff as stuff_db
)
import logging

logger = logging.getLogger(__name__)

TABLE = "stuff_in_cart"


async def get_cart_item(
        pk: int,
        conn: Connection
) -> Optional[cart.CartItem]:
    result = await conn.fetchrow(
        f"""
        SElECT * FROM {TABLE} WHERE id = $1
        """,
        pk
    )
    if result:
        data: cart.CartItem = record_to_model(cart.CartItem, result)
        data.stuff = await stuff_db.get_stuff_item(
            pk=data.stuff_id,
            conn=conn
        )
        return data
    return result


async def add_stuff_to_cart(
        user_id: int,
        model: cart.NewCartItem,
        conn: Connection
) -> cart.CartItem:
    item = await check_stuff_item(user_id, model.stuff_id, conn)
    if not item:
        result = await conn.fetchrow(
            f"""
            INSERT INTO {TABLE} 
            (user_id, stuff_id, stuff_count)
            VALUES ($1,$2,$3)
            RETURNING *
            """,
            user_id,
            model.stuff_id,
            model.stuff_count
        )
        data: cart.CartItem = record_to_model(cart.CartItem, result)
        data.stuff = await stuff_db.get_stuff_item(
            pk=data.stuff_id,
            conn=conn
        )

        return data
    else:
        result = await update_stuff_in_cart(
            item.id,
            cart.UpdateCartItem(
                stuff_count=model.stuff_count + item.stuff_count
            ),
            conn=conn
        )
        return result


async def delete_stuff_from_cart(
        pk: int,
        conn: Connection
) -> cart.CartItem:
    result = await conn.fetchrow(
        f"""
        UPDATE {TABLE}
        set en = false
        WHERE id = $1
        RETURNING *
        """,
        pk
    )

    data: cart.CartItem = record_to_model(cart.CartItem, result)
    data.stuff = await stuff_db.get_stuff_item(
        pk=data.stuff_id,
        conn=conn
    )
    return data


async def update_stuff_in_cart(
        pk: int,
        model: cart.UpdateCartItem,
        conn: Connection
) -> cart.CartItem:
    result = await conn.fetchrow(
        f"""
        UPDATE {TABLE}
        SET stuff_count = $1
        WHERE id = $2
        RETURNING *
        """,
        model.stuff_count,
        pk
    )
    data: cart.CartItem = record_to_model(cart.CartItem, result)
    data.stuff = await stuff_db.get_stuff_item(
        pk=data.stuff_id,
        conn=conn
    )
    return data


async def get_user_cart(
        user_id: int,
        conn: Connection
) -> Optional[List[cart.CartItem]]:
    result = await conn.fetch(
        f"""
        SELECT * FROM {TABLE}
        WHERE user_id = $1 and en=true
        """,
        user_id
    )

    data: Optional[List[cart.CartItem]] = record_to_model_list(cart.CartItem, result)

    for item in data:
        item.stuff = await stuff_db.get_stuff_item(
            pk=item.stuff_id,
            conn=conn
        )

    return data


async def check_stuff_item(
        user_id: int,
        stuff_id: int,
        conn: Connection
) -> cart.CartItem:
    result = await conn.fetchrow(
        f"""
        SELECT * FROM {TABLE}
        WHERE user_id=$1 and stuff_id=$2  and en=True  
        """,
        user_id,
        stuff_id
    )
    return record_to_model(cart.CartItem, result)
