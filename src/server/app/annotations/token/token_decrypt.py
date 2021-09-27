from flask import request
from app.endpoints.authentication.auth_service import AuthService

from setup import fernet

authService = AuthService()


def jwt_token_decrypted(func):  # TODO: change name
    def wrapper():  # maybe change to token only
        token = read_token_from_request()
        print("token " + token)
        # result = fernet.decrypt(bytes(token, encoding='utf8'))
        result = token.removeprefix('a')

        print(result)

        if verify_token(result):
            return func(result)
        # wenn token irgendwas ist nicht 401 returnen problem im frontend -> refresh-loop etc.
        return 401
    wrapper.__name__ = func.__name__
    return wrapper


def read_token_from_request():
    encrypted_token = request.headers.get('Authorization')\
        .removeprefix('Bearer ')  # remove prefix of access / refresh token
    return encrypted_token


def verify_token(token):
    return authService.is_token_active(token)



# check if jwt token is in header -> DONE
# if yes -> call jwt token decrypted
# verify token
# if valid -> doesnt stop
# if expired -> send 401 -> refresh_token


