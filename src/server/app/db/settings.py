from flask_oidc import OpenIDConnect
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO
from flask_pymongo import PyMongo

jwt = JWTManager()
oidc = OpenIDConnect()
socketio = SocketIO(async_mode='threading')
db = PyMongo()


