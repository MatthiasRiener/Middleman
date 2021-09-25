from flask import Flask, Blueprint, blueprints


from app.db.settings import db, oidc, jwt, socketio

from app.endpoints.landing.controllers import landing_page
from app.endpoints.authentication.controllers import authentication_page
from app.endpoints.profile.controllers import profile_page


app = Flask(__name__, template_folder="./app/files/templates",
            static_folder="./app/files/static")



app.config.update({
    'SECRET_KEY': 'middleman-secret',
    'TESTING': True,
    'OIDC_CLIENT_SECRETS': 'client_secrets.json',
    'OIDC_ID_TOKEN_COOKIE_SECURE': False,
    'OIDC_REQUIRE_VERIFIED_EMAIL': False,
    'OIDC_USER_INFO_ENABLED': True,
    'OIDC_OPENID_REALM': 'Middleman',
    'OIDC_SCOPES': ['openid', 'email', 'profile', 'roles'],
    'OIDC_INTROSPECTION_AUTH_METHOD': 'client_secret_post',
    'MONGO_URI': "mongodb://middleman:soos@localhost:27017/middlemandb?authSource=admin",
    'JWT_SECRET_KEY': 'jwt-secret-string'
})



app.config['MONGODB_CONNECT'] = False


app.register_blueprint(profile_page, url_prefix="/profile")
app.register_blueprint(landing_page, url_prefix="/landing")
app.register_blueprint(authentication_page, url_prefix="/authentication")



# intializing for mongo and oidc
db.init_app(app)
oidc.init_app(app)
jwt.init_app(app)
socketio.init_app(app)



