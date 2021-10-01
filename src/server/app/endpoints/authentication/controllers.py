import json

from flask import Flask, render_template, Blueprint, url_for, request
# request.headers

from ...annotations.token.token_decrypt import jwt_token_decrypted, read_token_from_request
from ...db.settings import oidc
from ..authentication.auth_service import AuthService, getPrefix

authentication_page = Blueprint("authentication", __name__)

auth_service = AuthService()


# for future: use DI


@authentication_page.route('/log-in', methods=["GET"])
@oidc.require_login
def login():
    access_token = oidc.get_access_token()
    refresh_token = oidc.get_refresh_token()

    encrypted_acc, encrypted_ref = auth_service.encrypt_token(access_token, refresh_token)

    user_credentials = oidc.user_getinfo(
        ['preferred_username', 'email', 'sub', 'roles'])

    user_id = user_credentials.get('sub')
    user_name = user_credentials.get('preferred_username')
    user_mail = user_credentials.get('email')

    # user in db
    redirect = render_template('profile/index.html',
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


@authentication_page.route('/refresh-token', methods=["GET"])
@jwt_token_decrypted
def is_active(refresh_token):
    return auth_service.refresh(refresh_token)


@authentication_page.route('/get-token', methods=["GET"])
@jwt_token_decrypted
def isTest(token):
    return str(auth_service.is_token_active('hättst wohl gern'))


@authentication_page.route('/get', methods=["GET"])
@jwt_token_decrypted
def isTest2():
    return "dsahi"  # auth_service.encrypted_token -> worked


def getRefreshToken(http_request):
    return http_request.headers.get('Authorization') \
        .removeprefix(getPrefix())
