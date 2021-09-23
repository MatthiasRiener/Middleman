from flask import Flask, render_template, Blueprint
from ...db.settings import oidc


authentication_page = Blueprint("authentication", __name__)

@authentication_page.route('/log-in', methods=["GET"])
@oidc.require_login
def logIn(): 
    print('hfuodsonfsjda')

    user_creds = oidc.user_getinfo(
        ['preferred_username', 'email', 'sub', 'roles'])
        
    user_id = user_creds.get('sub')
    user_name = user_creds.get('preferred_username')
    user_mail = user_creds.get('email')


    return user_id + "-" + user_name + "-" + user_mail
