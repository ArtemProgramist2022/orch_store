import datetime
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from fastapi import APIRouter, Depends
from models import orders
from typing import (
    Optional,
    List
)
from misc.fastapi.depends.conf import get as get_conf
from misc.fastapi.depends.notisend import get as get_sms
from services.orch_store.depends.admin_area import check_rule
from db import order as orders_db
from misc.db import Connection
from misc.session import Session
from misc.smtp import SMTP, send
from misc.fastapi.depends.smtp import get as get_smtp
from misc.fastapi.depends.jinja import get as get_jinja
from jinja2.environment import Environment as JinjaEnv
from misc.fastapi.depends.session import get as get_session
from misc.fastapi.depends.db import get as get_db
from misc import handlers, notisend
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


@router.get('/{order_id}', response_model=orders.OrderSuccessResponse)
async def get_order(
        order_id: int,
        conn: Connection = Depends(get_db),
        session: Session = Depends(get_session)
):
    if session.user.is_authenticated is False:
        return await handlers.error_401()

    result = await orders_db.get_order(
        order_id=order_id,
        conn=conn
    )
    return orders.OrderSuccessResponse(
        data=result
    )


@router.post('/', response_model=orders.OrderSuccessResponse)
async def create_order(
        model: orders.NewOrder,
        conn: Connection = Depends(get_db),
        session: Session = Depends(get_session),
        conf: dict = Depends(get_conf),
        jinja: JinjaEnv = Depends(get_jinja),
        smtp_conn: SMTP = Depends(get_smtp)
):
    if session.user.is_authenticated is False:
        return await handlers.error_401()

    result = await orders_db.create_order(
        user_id=session.user.id,
        model=model,
        conn=conn
    )
    if result:
        await send_new_order_message(
            smtp=smtp_conn,
            email=session.user.email,
            jinja=jinja,
            conf=conf,
            order=result,
            final_sum=sum(
                [
                    i.stuff_count * i.stuff.cost
                    for i in result.items
                ]
            )
        )
    return orders.OrderSuccessResponse(
        data=result
    )


@router.post(
    '/{order_id}',
    response_model=orders.OrderSuccessResponse,
    dependencies=[Depends(check_rule)]
)
async def update_order_by_admin(
        order_id: int,
        model: orders.UpdateOrder,
        conn: Connection = Depends(get_db),
        session: Session = Depends(get_session),

):
    result = await orders_db.update_order(
        order_id=order_id,
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


async def send_new_order_message(
        smtp: SMTP,
        email: str,
        jinja: JinjaEnv,
        conf: dict,
        order: orders.Order,
        final_sum: float
):
    msg = MIMEMultipart()
    msg['To'] = email
    msg['From'] = conf['smtp']['sender']
    msg['Subject'] = 'Новый заказ'

    jinja_tmpl = jinja.get_template('order_template.html')

    part = MIMEText(
        jinja_tmpl.render(order=order, final_sum=final_sum),
        'html'
    )
    msg.attach(part)
    await send(smtp=smtp, message=msg)
