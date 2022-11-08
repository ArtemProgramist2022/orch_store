import os

from misc.db import (
    Connection,
    record_to_model,
    record_to_model_list
)
import mimetypes
from datauri.datauri import parse, DataURIError
from models.stuff import (
    Stuff,
    NewStuff,
    UpdateStuff, stuff_image_file_path, stuff_image_absolute_file_path
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
    idx = 3
    params = [limit, offset]
    wheres = [' en = true ']
    if category_id:
        params.append(category_id)
        wheres.append(f" category_id = ${idx} ")
        idx += 1
    result = await conn.fetch(
        f"""
        SELECT * FROM {TABLE} {'WHERE ' + 'AND'.join(wheres) if wheres else ''} LIMIT $1 OFFSET $2
        """,
        *params
    )

    data: List[Stuff] = record_to_model_list(Stuff, result)

    for item in data:
        item.category = await categories.get_category(item.category_id, conn)
    return data


async def add_stuff_item(
        new_stuff: NewStuff,
        stuff_image_folder: str,
        stuff_link_base: str,
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
    complete_result: Stuff = record_to_model(Stuff, result)
    query = None
    if new_stuff.photo is not None or new_stuff.photo != "":
        try:
            abs_filepath, filepath = await write_stuff_image(
                post_id=result['id'],
                post_image=new_stuff.photo,
                post_image_folder=stuff_image_folder
            )
            query = await conn.fetchrow(
                f"""
                UPDATE {TABLE} set stuff_link=$1 WHERE id = $2 returning *
                """,
                f"{stuff_link_base}/{filepath}",
                result['id']
            )
        except DataURIError as e:
            logger.info(f"{e=}")
    if query is not None:
        complete_result.stuff_link = query['stuff_link']

    return complete_result


async def get_stuff_item(
        pk: int,
        conn: Connection
) -> Stuff:
    result = await conn.fetchrow(
        f"""
        SELECT * FROM {TABLE} WHERE id = $1 and en = true
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
    values = []
    if category_id:
        values.append(category_id)
    result = await conn.fetchrow(
        f"""
        SELECT count(*)
        FROM {TABLE}
        {"WHERE category_id = $1" if category_id else ''}
        """,
        *values
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


async def write_stuff_image(
        post_id: int,
        post_image: str,
        post_image_folder: str,
) -> List[str]:
    img_data = parse(post_image)
    logger.info(img_data)
    extension = mimetypes.guess_extension(img_data.media_type)
    filepath = stuff_image_file_path(post_id, extension)
    abs_filepath = stuff_image_absolute_file_path(post_image_folder, filepath)

    abs_folder = os.path.dirname(abs_filepath)
    if not os.path.exists(abs_folder):
        os.makedirs(abs_folder)
    with open(abs_filepath, "wb") as fd:
        fd.write(img_data.data)
        fd.close()
    print(abs_filepath)
    return [abs_filepath, filepath]
