from flask import Flask, render_template, Blueprint
from ../../db/settings import oidc

authentication_page = Blueprint("authentication", __name__)

@authentication_page.route('/log-in', methods=["GET"])
@oidc.require_login
def logIn(): 
    print('hfuodsonfsjda')
