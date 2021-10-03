
from ..db.settings import db
from ..models.user import User


def deleteUserByUserId(u_id):
    deleted_user = db.db.users.find_one_and_delete({'u_id': u_id})
    return lambda x: "Deleted" if deleted_user is not None else "Not existing"


def getUserByUserId(u_id):
    return db.db.users.find_one({'u_id': u_id})


def editUser(user):
    db_user: User = getUserByUserId(user.u_id)
    db_user.username = user.username
    db_user.surname = user.surname
    db_user.family_name = user.family_name
    db_user.email = user.email

    db.db.users.replace_one({'u:id': user.u_id}, user.to_dict())


class UserRepository:

    def __init__(self):
        pass



