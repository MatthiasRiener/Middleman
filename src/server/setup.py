from cryptography.fernet import Fernet


key = Fernet.generate_key()
fernet = Fernet(key)
