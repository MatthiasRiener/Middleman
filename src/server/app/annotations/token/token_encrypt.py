from setup import fernet


def jwt_token_encrypted(func):
    def wrapper(*args, **kwargs):
        access_token = args[1] or "abc"
        if access_token == "abc":
            raise Exception("Access Token is null")
        acc_result = fernet.encrypt(bytes(access_token, encoding='ascii')).decode()

        refresh_token = args[2] or "abc"
        if refresh_token == "abc":
            raise Exception("Refresh Token is null")
        ref_result = fernet.encrypt(refresh_token.encode(encoding='ascii')).decode()

        return acc_result, ref_result
    wrapper.__name__ = func.__name__
    return wrapper
