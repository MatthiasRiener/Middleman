from keycloak import KeycloakOpenID
from datetime import datetime
import json


class AuthService:
    f = open('client_secrets.json')
    keycloak_openid = KeycloakOpenID(server_url="http://localhost:8080/auth/",
                                     client_id="example_client",
                                     realm_name="middleman",
                                     client_secret_key="not_configured")

    def __init__(self):
        self.configure()

    access_token = None
    refresh_token = None

    def login(self, access_token, refresh_token):
        self.access_token = access_token
        self.refresh_token = refresh_token

        print("Refresh" + self.refresh_token)
        print("Access" + self.access_token)

        return

    def logout(self, refresh_token):
        self.keycloak_openid.logout(refresh_token)
        return "logged out"

    def configure(self):
        data = json.load(self.f)
        self.keycloak_openid.client_id = data['web']['client_id']
        self.keycloak_openid.client_secret_key = data['web']['client_secret']
        # for future: use keyvaults for python etc.

    def is_token_active(self):
        token_info = self.keycloak_openid.introspect(self.access_token)
        return token_info.get('active')

    def refresh(self):
        if not self.is_token_active():
            token = self.keycloak_openid.refresh_token(self.refresh_token)
            self.access_token = token.get('access_token')
            self.refresh_token = token.get('refresh_token')
            return "Refreshed"
        return "Not refreshed"
