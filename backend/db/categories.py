from misc.db import (
    Connection,
    record_to_model,
    record_to_model_list
)
from typing import (
    Optional,
    List
)
import logging
from models import categories as cat_models

logger = logging.getLogger(__name__)

TABLE = "categories"


async def get_categories(
        conn: Connection
) -> List[cat_models.Category]:
    result = await conn.fetch(
        f"""
        SELECT * FROM {TABLE} ORDER BY name
        """
    )

    return record_to_model_list(
        cat_models.Category,
        result
    )


async def get_category(
        pk: int,
        conn: Connection
) -> cat_models.Category:
    return record_to_model(
        cat_models.Category, await conn.fetchrow(
            f"""
            SELECT * FROM {TABLE} WHERE id = $1
            """,
            pk
        )
    )


async def add_category(
        model: cat_models.NewCategory,
        conn: Connection
) -> cat_models.Category:
    result = await conn.fetchrow(
        f"""
        INSERT INTO {TABLE} (name) VALUES ($1) RETURNING *
        """,
        model.name
    )

    return record_to_model(cat_models.Category, result)


async def update_category(
        pk: int,
        model: cat_models.UpdateCategory,
        conn: Connection
) -> Optional[cat_models.Category]:
    if not model.name:
        return None

    result = await conn.fetchrow(
        f"""
        UPDATE {TABLE} SET name = $2 WHERE id = $1 RETURNING *
        """,
        pk,
        model.name
    )
    return record_to_model(cat_models.Category, result)


async def delete_category(
        pk: int,
        conn: Connection
) -> cat_models.Category:
    result = await conn.fetchrow(
        f"""
        DELETE FROM {TABLE} WHERE id = $1 RETURNING *
        """,
        pk
    )

    return record_to_model(cat_models.Category, result)


async def check_exist(
        pk: int,
        conn: Connection
) -> bool:
    result = await conn.fetchrow(
        f"""
        SELECT count(*) FROM {TABLE} WHERE id = $1
        """,
        pk
    )

    return True if result['count'] > 0 else False
