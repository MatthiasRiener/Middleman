from flask import Flask, render_template, Blueprint

profile_page = Blueprint("profile", __name__)

@profile_page.route('/', methods=["GET"])
def index():
    return render_template('/profile/index.html')


@profile_page.route('/settings', methods=["GET"])
def settingsRoute():
    return render_template('/profile/settings.html')