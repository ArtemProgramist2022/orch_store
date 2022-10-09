from fastapi import APIRouter, FastAPI
from services.fastapi_template.pages import (
    index
)


def register_pages(app: FastAPI):
    router = APIRouter()

    router.include_router(
        index.router
    )
    app.include_router(router)
    return app
