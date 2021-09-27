from keycloak import KeycloakOpenID
from datetime import datetime
import json

from app.annotations.token.token_encrypt import jwt_token_encrypted


def getPrefix():
    return "Bearer "


class AuthService:

    f = open('client_secrets.json')
    keycloak_openid = KeycloakOpenID(server_url="http://localhost:8080/auth/",
                                     client_id="not_configured",
                                     realm_name="middleman")

    def __init__(self):
        self.configure()

    def configure(self):
        # data = json.load(self.f)
        self.keycloak_openid.client_id = "python-middleman"  # data['web']['client_id']
        self.keycloak_openid.client_secret_key = "3edd528e-f080-4bb7-8023-de773324f5b8"  # data['web']['client_secret']
        # for future: use keyvaults for python etc.

    @jwt_token_encrypted
    def encrypt_token(self, access_token, refresh_token):
        return access_token, refresh_token

    def logout(self, refresh_token):
        self.keycloak_openid.logout(refresh_token)
        return "logged out"

    def is_token_active(self, access_token):
        token_info = self.keycloak_openid.introspect(access_token)
        # another check if refresh token is active
        return token_info.get('active')

    def refresh(self, refresh_token):
        token = self.keycloak_openid.refresh_token(refresh_token)
        return self.encrypt_token(token.get('access_token'), token.get('refresh_token'))
