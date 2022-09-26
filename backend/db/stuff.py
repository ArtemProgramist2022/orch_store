from misc.db import (
    Connection,
    record_to_model,
    record_to_model_list
)
from models.stuff import (
    Stuff,
    NewStuff,
    UpdateStuff
)
from typing import (
    Optional,
    List
)
from db import categories
import logging

logger = logging.getLogger(__name__)

TABLE = "stuff"


async def get_stuff_list(
        category_id: int,
        page: int,
        limit: int,
        conn: Connection
) -> Optional[List[Stuff]]:
    offset = limit * (page - 1)

    result = await conn.fetch(
        f"""
        SELECT * FROM {TABLE} WHERE category_id=$3 LIMIT $1 OFFSET $2
        """,
        limit,
        offset,
        category_id
    )

    data: List[Stuff] = record_to_model_list(Stuff, result)

    for item in data:
        item.category = await categories.get_category(item.category_id, conn)
    return data


async def add_stuff_item(
        new_stuff: NewStuff,
        conn: Connection
) -> Stuff:
    result = await conn.fetchrow(
        f"""
        INSERT INTO {TABLE} 
        (
            name, 
            description, 
            cost, 
            count_on_warehouse, 
            category_id
        )
        VAlUES (
            $1, $2, $3, $4, $5
        )
        RETURNING *
        """,
        new_stuff.name,
        new_stuff.description,
        new_stuff.cost,
        new_stuff.count_on_warehouse,
        new_stuff.category_id
    )

    return record_to_model(Stuff, result)


async def get_stuff_item(
        pk: int,
        conn: Connection
) -> Stuff:
    result = await conn.fetchrow(
        f"""
        SELECT * FROM {TABLE} WHERE id = $1
        """,
        pk
    )

    return record_to_model(Stuff, result)


async def update_stuff_item(
        model: UpdateStuff,
        pk: int,
        conn: Connection
) -> Stuff:
    data = model.dict()

    fields = []
    values = [pk]
    idx = 2

    for key in data:
        if data[key]:
            fields.append(f"{key} = ${idx}")
            values.append(data[key])
            idx += 1

    result = await conn.fetchrow(
        f"""
        UPDATE {TABLE} 
        {"SET " + " , ".join(fields) if fields else ""} 
        WHERE id = $1
        RETURNING *
        """,
        *values
    )

    return record_to_model(Stuff, result)


async def get_total(
        category_id: int,
        conn: Connection
) -> int:
    result = await conn.fetchrow(
        f"""
        SELECT count(*)
        FROM {TABLE}
        WHERE category_id = $1
        """,
        category_id
    )

    return result['count']


async def delete_stuff_item(
        stuff_id: int,
        conn: Connection
) -> Stuff:
    result = await conn.fetchrow(
        f"""
        DELETE FROM {TABLE}
        WhERE id = $1
        RETURNING *
        """,
        stuff_id
    )

    return record_to_model(Stuff, result)
