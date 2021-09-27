from cryptography.fernet import Fernet

key = Fernet.generate_key()

fernet = Fernet(key)


def jwt_token_encrypted(func):
    def wrapper(*args, **kwargs):
        access_token = func(*args, **kwargs)
        access_string = access_token or "abc"
        result = fernet.encrypt(access_string.encode())
        return result
    return wrapper


def jwt_token_decrypted(func):
    def wrapper(*args, **kwargs):
        access_token = func(*args, **kwargs)
        result = fernet.decrypt(access_token)
        return result
    return wrapper


