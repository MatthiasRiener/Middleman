from flask import request
from app.endpoints.authentication.auth_service import AuthService

from setup import fernet

authService = AuthService()


def jwt_token_decrypted(func):  # TODO: change name
    def wrapper():  # maybe change to token only
        token = read_token_from_request()
        result = fernet.decrypt(bytes(token, encoding="ascii"))
        # result = token.removeprefix('a')

        try:
            if verify_token(result):
                return func(result)
        except:
            return 500

        return 401
    wrapper.__name__ = func.__name__
    return wrapper


def read_token_from_request():
    encrypted_token = request.headers.get('Authorization')\
        .removeprefix('Bearer ')  # remove prefix of access / refresh token

    return encrypted_token.replace("&#39", "'")


def verify_token(token):
    return authService.is_token_active(token)


# check if jwt token is in header -> DONE
# if yes -> call jwt token decrypted
# verify token
# if valid -> doesnt stop
# if expired -> send 401 -> refresh_token


