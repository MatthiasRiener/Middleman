from keycloak import KeycloakOpenID
import json


class AuthService:

    f = open('client_secrets.json')
    keycloak_openid = KeycloakOpenID(server_url="http://localhost:8080/auth/",
                                     client_id="example_client",
                                     realm_name="middleman",
                                     client_secret_key="not_configured")

    def logout(self, refresh_token):
        if self.keycloak_openid.client_secret_key == 'not_configured':
            self.configure()
        self.keycloak_openid.logout(refresh_token)
        return "logged out"

    def configure(self):
        data = json.load(self.f)
        self.keycloak_openid.client_id = data['web']['client_id']
        self.keycloak_openid.client_secret_key = data['web']['client_secret']
        # for future: use keyvaults for python etc.
