import datetime
import json

import flask
from ..db.settings import db
from ..models.user import User

from ..repository.user_repository import UserRepository


class AuthenticationRepository:

    def __init__(self):
        pass

    def createUser(u_id, username, surname, family_name, email, created, last_login):
        if u_id is None:
            raise Exception()

        if username is None or type(username) is not str:
            raise Exception()

        if surname is None or type(surname) is not str:
            raise Exception()

        if family_name is None or type(family_name) is not str:
            raise Exception()

        if email is None or type(email) is not str:
            raise Exception()

        if last_login is None or type(last_login) is not datetime.datetime:
            raise Exception()

        if created is None or type(created) is not datetime.datetime:
            raise Exception()

        user = User(u_id, username, surname, family_name, email, last_login, created)

        user_in_db = getUserByUserId()

        if user_in_db is not None:
            db.db.users.update_one({'u_id': user.u_id}, {'$set': {'last_login': user.last_login}})

        else:
            db.db.users.insert_one(user.to_dict())

        return user
