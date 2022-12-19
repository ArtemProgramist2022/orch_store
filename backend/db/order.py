import datetime

from misc.db import (
    Connection,
    record_to_model_list,
    record_to_model
)
from models import orders
from db import (
    users,
    cart
)
from typing import (
    Optional,
    List
)

TABLE = 'orders'
CHILD_TABLE = 'orders_cart_items'


async def create_order(
        user_id: int,
        model: orders.NewOrder,
        conn: Connection
) -> Optional[orders.Order]:
    data = model.dict()
    items = data.pop('items')
    async with conn.transaction():
        result = await conn.fetchrow(
            f"""
            INSERT INTO {TABLE} 
                (user_id, delivery_address) 
            VALUES 
                ($1, $2) 
            RETURNING *
            """,
            user_id,
            model.delivery_address
        )
        idx = 2
        values = []
        for i in items:
            values.append(f'($1, ${idx})')
            idx += 1
        result_items = await conn.fetch(
            f"""
            INSERT INTO {CHILD_TABLE}
                (order_id, cart_item_id) 
            VALUES {','.join(values)} 
            RETURNING *
            """,
            result['id'],
            *items
        )
        cart_items = []
        for i in result_items:
            cart_items.append(
                await cart.get_cart_item(
                    pk=i['cart_item_id'],
                    conn=conn
                )
            )
        new_data: orders.Order = record_to_model(orders.Order, result)
        new_data.user = await users.get_user(pk=new_data.user_id, conn=conn)
        new_data.items = cart_items
        return new_data
    return None


async def get_orders_list(
        conn: Connection,
        user_id: int = None,
        order_status: orders.OrderStatus = None,
        delivery_date: datetime.date = None
) -> Optional[List[orders.Order]]:
    filters = []
    values = []
    idx = 1

    if user_id:
        filters.append(f'user_id = ${idx}')
        values.append(user_id)
        idx += 1
    if order_status:
        filters.append(f"status = ${idx}")
        values.append(order_status)
        idx += 1
    if delivery_date:
        filters.append(f"delivery_date = ${delivery_date}")

    result = await conn.fetch(
        f"""
        SELECT * FROM {TABLE}
        {' WHERE ' + ' AND '.join(filters) if filters else ''}
        """,
        *values
    )
    data: Optional[List[orders.Order]] = record_to_model_list(orders.Order, result)
    if data:
        for item in data:
            item.user = await users.get_user(pk=item.user_id, conn=conn)
            item.items.append(
                await cart.get_cart_item(
                    pk=item.id,
                    conn=conn
                )
            )
    return data


async def update_order(
        order_id: int,
        model: orders.UpdateOrder,
        conn: Connection
) -> Optional[orders.Order]:
    pass
