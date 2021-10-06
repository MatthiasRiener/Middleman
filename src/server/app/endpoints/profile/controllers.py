from flask import Flask, render_template, Blueprint

from ...annotations.token.token_decrypt import verify_decrypted_token

profile_page = Blueprint("profile", __name__)


@verify_decrypted_token
@profile_page.route('/', methods=["GET"])
def index():
    return render_template('/profile/index.html')


@verify_decrypted_token
@profile_page.route('/settings', methods=["GET"])
def settingsRoute():
    return render_template('/profile/settings.html')


@verify_decrypted_token
@profile_page.route('/edit-profile', methods=["PUT"])
def edit_user():
    return render_template('/profile/index.html')
