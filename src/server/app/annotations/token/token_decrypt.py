import flask
from app.endpoints.authentication.auth_service import AuthService
from flask import request
from setup import fernet

authService = AuthService()


def verify_decrypted_token(func):
    def wrapper(*args, **kwargs):
        jwt_token_decrypted(func)
        return func(*args, **kwargs)
    return wrapper


def jwt_token_decrypted(func):
    def wrapper():
        token = read_token_from_request()
        result = fernet.decrypt(bytes(token, encoding="ascii")).decode()

        if verify_token(result) or func.__name__ == "logout":
            return func(result)

        return flask.Response(status=401)
    wrapper.__name__ = func.__name__
    return wrapper


def read_token_from_request():
    encrypted_token = request.headers.get('Authorization')\
        .removeprefix('Bearer ')  # remove prefix of access / refresh token

    return encrypted_token


def verify_token(token):
    return authService.is_token_active(token)
