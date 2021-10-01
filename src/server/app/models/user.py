import datetime
import json


class User:
    def __init__(self, u_id, username, surname, family_name, email, last_login, created=None):
        self.u_id = u_id
        self.username = username
        self.surname = surname
        self.family_name = family_name
        self.email = email
        self.last_login = str(last_login)
        self.created = str(created)

    def to_dict(self):
        return json.loads(json.dumps(self, default=lambda o: o.__dict__, sort_keys=False))

