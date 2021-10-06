import datetime
import time

from flask import render_template, Blueprint

from ..authentication.auth_service import AuthService
from ...annotations.token.token_decrypt import jwt_token_decrypted
from ...db.settings import oidc
from ...repository.user_repository import UserRepository

user_repo = UserRepository()

authentication_page = Blueprint("authentication", __name__)

auth_service = AuthService()

# for future: use DI


@authentication_page.route('/log-in', methods=["GET"])
@oidc.require_login
def login():
    access_token = oidc.get_access_token()
    refresh_token = oidc.get_refresh_token()

    encrypted_acc, encrypted_ref = auth_service.encrypt_token(access_token, refresh_token)

    token_info = auth_service.get_token_info(access_token)

    user = user_repo.createUser(
        u_id=token_info.get('sub'),
        username=token_info.get('preferred_username'),
        surname=token_info.get('given_name'),
        family_name=token_info.get('family_name'),
        email=token_info.get('email'),
        created=datetime.datetime.now(),
        last_login=datetime.datetime.now()
    )

    redirect = render_template('profile/index.html', user=user,
                               access=encrypted_acc, refresh=encrypted_ref, newLogIn=True)

    return redirect


@authentication_page.route('/log-out', methods=["GET"])
@jwt_token_decrypted
def logout(refresh_token):
    user_credentials = oidc.user_getinfo(
        ['preferred_username'])

    user_name = user_credentials.get('preferred_username')

    auth_service.logout(refresh_token)
    oidc.logout()

    print(user_name)
    return "User " + user_name + " logged out"


@authentication_page.route('/refresh-token', methods=["POST"])
@jwt_token_decrypted
def is_active(refresh_token):
    new_access_token, new_refresh_token = auth_service.refresh(refresh_token)
    return {
        "access": new_access_token,
        "refresh": new_refresh_token
    }
