from fastapi import APIRouter, Depends
from fastapi.responses import HTMLResponse
from misc.fastapi.depends.jinja import (
    get as get_jinja
)
from jinja2 import Environment as JinjaEnvironment
import logging

logger = logging.getLogger(__name__)

router = APIRouter(
    tags=['Site']
)


@router.get('/', response_class=HTMLResponse)
async def main_page(
        jinja: JinjaEnvironment = Depends(get_jinja)
):
    template = jinja.get_template('pages/index.html')
    return HTMLResponse(content=template.render())
