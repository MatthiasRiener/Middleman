import flask
from setup import fernet


def jwt_token_encrypted(func):
    def wrapper(*args):
        access_token = args[1] or "abc"
        if access_token == "abc":
            return flask.Response(status=400)
        acc_result = fernet.encrypt(bytes(access_token, encoding='ascii')).decode()

        refresh_token = args[2] or "abc"
        if refresh_token == "abc":
            return flask.Response(status=400)
        ref_result = fernet.encrypt(bytes(refresh_token, encoding='ascii')).decode()

        return acc_result, ref_result
    wrapper.__name__ = func.__name__
    return wrapper
