from fastapi import APIRouter
from . import (
    auth,
    users,
    categories,
    stuff,
    cart
)
from .admin import register_routers as admin_route


def register_routers(app):
    router = APIRouter(prefix='/api/v1')

    router.include_router(
        auth.router,
    )
    router.include_router(
        users.router,
    )
    router.include_router(
        categories.router
    )
    router.include_router(
        stuff.router
    )
    router.include_router(
        cart.router
    )
    admin_route(app)
    app.include_router(router)
    return app
