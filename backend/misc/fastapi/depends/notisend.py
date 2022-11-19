import logging
import fastapi
from misc.notisend import SMS

logger = logging.getLogger(__name__)


async def get(request: fastapi.Request) -> SMS:
    try:
        return request.app.state.sms
    except AttributeError:
        raise RuntimeError('Application state has no sms service')