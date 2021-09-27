from cryptography.fernet import Fernet

key = Fernet.generate_key()

fernet = Fernet(key)


def jwt_token_encrypted(func):
    def wrapper(*args, **kwargs):
        access_token = args[1] or "abc"
        if access_token == "abc":
            raise Exception("Access Token is null")
        acc_result = fernet.encrypt(access_token.encode())

        refresh_token = args[2] or "abc"
        if refresh_token == "abc":
            raise Exception("Access Token is null")
        ref_result = fernet.encrypt(refresh_token.encode())

        return acc_result, ref_result
    return wrapper


def jwt_token_decrypted(func):
    def wrapper(*args, **kwargs):
        access_token = func(*args, **kwargs)
        result = fernet.decrypt(access_token)
        return result
    return wrapper


