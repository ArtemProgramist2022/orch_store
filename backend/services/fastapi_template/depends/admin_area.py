from fastapi import Depends
from misc.session import Session
from misc.fastapi.depends.session import get as get_session
from misc.fastapi.depends.db import get as get_db
from misc.handlers import UnauthenticatedException, UserRoleException
from db import admin as db_admin
from misc import db
import logging


logger = logging.getLogger(__name__)


async def check_rule(
        conn: db.Connection = Depends(get_db),
        session: Session = Depends(get_session)
):
    if not session.user.is_authenticated:

        logger.info('тут')
        raise UnauthenticatedException()
    if not await db_admin.check_rules(conn, session.user.id):
        logger.info(' теперь тут')
        raise UserRoleException()
