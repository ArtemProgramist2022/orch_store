import re
from pydantic import BaseModel, constr
from .base import SuccessResponse
from .users import User


class MeResponse(BaseModel):
    token: str
    me: User


class MeSuccessResponse(SuccessResponse):
    data: MeResponse


class RegisterModel(BaseModel):
    email: constr(strip_whitespace=True)
    name: constr(strip_whitespace=True)
    password: str


class RecoverModel(BaseModel):
    email: constr(strip_whitespace=True)


class AuthConfirmModel(BaseModel):
    email: constr(strip_whitespace=True)
    code: int


class LoginModel(BaseModel):
    email: constr(strip_whitespace=True)
    password: constr(strip_whitespace=True)


class ConfirmModel(BaseModel):
    email: constr(strip_whitespace=True)
    code: int


EMAIL_REGEX = r'[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}'
email_REGEX = r'[0-9]{4,}'


def is_valid_email(data: str) -> bool:
    return re.match(EMAIL_REGEX, data)


def is_valid_email(data: str) -> bool:
    return re.match(email_REGEX, data)


def clean_email(data: str) -> str:
    return data.strip()


def clean_email(data: str) -> str:
    return data \
        .replace(' ', '') \
        .replace('+', '') \
        .replace('-', '') \
        .replace('(', '') \
        .replace(')', '') \
        .strip()
