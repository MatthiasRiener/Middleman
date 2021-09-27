from flask import Flask, render_template, Blueprint, redirect, url_for

from ...annotations.token.token_service import jwt_token_decrypted
from ...db.settings import oidc
from ..authentication.auth_service import AuthService

authentication_page = Blueprint("authentication", __name__)

auth_service = AuthService()
# for future: use DI


@authentication_page.route('/log-in', methods=["GET"])
@oidc.require_login
def login():

    access_token = oidc.get_access_token()
    refresh_token = oidc.get_refresh_token()

    encrypted = auth_service.login(access_token, refresh_token)
    auth_service.encrypted_token = encrypted

    user_credentials = oidc.user_getinfo(
        ['preferred_username', 'email', 'sub', 'roles'])

    user_id = user_credentials.get('sub')
    user_name = user_credentials.get('preferred_username')
    user_mail = user_credentials.get('email')

    return encrypted


@authentication_page.route('/log-out', methods=["GET"])
@oidc.require_login
def logout():
    user_credentials = oidc.user_getinfo(
        ['preferred_username'])

    user_name = user_credentials.get('preferred_username')

    refresh_token = oidc.get_refresh_token()

    auth_service.logout(refresh_token)
    oidc.logout()

    return "User " + user_name + " logged out"


@authentication_page.route('/refresh', methods=["GET"])
@oidc.require_login
def is_active():
    return auth_service.refresh()


@authentication_page.route('/get-token', methods=["GET"])
@jwt_token_decrypted
def isTest():
    return auth_service.encrypted_token

