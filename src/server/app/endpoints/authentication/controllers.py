from flask import Flask, render_template, Blueprint, redirect, url_for
from ...db.settings import oidc
from ..authentication.authservice import AuthService

authentication_page = Blueprint("authentication", __name__)


@authentication_page.route('/log-in', methods=["GET"])
@oidc.require_login
def login():
    print('hfuodsonfsjda')

    user_credentials = oidc.user_getinfo(
        ['preferred_username', 'email', 'sub', 'roles'])

    user_id = user_credentials.get('sub')
    user_name = user_credentials.get('preferred_username')
    user_mail = user_credentials.get('email')

    return redirect(url_for('landing.index'))


@authentication_page.route('/log-out', methods=["GET"])
@oidc.require_login
def logout():
    user_credentials = oidc.user_getinfo(
        ['preferred_username', 'email', 'sub', 'roles'])

    user_name = user_credentials.get('preferred_username')

    auth_service = AuthService()
    # for future: use DI

    refresh_token = oidc.get_refresh_token()
    # der clown gibt keinen refresh token

    print(refresh_token)

    auth_service.logout(refresh_token)
    return "User " + user_name + " logged out"
