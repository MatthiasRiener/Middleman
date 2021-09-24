FROM jboss/keycloak:latest
LABEL maintainer="Nixi und Matts"
# copy fehlt nu
COPY ./imports/realm-export.json /tmp/realm-export.json
ENV KEYCLOAK_USER=middleman KEYCLOAK_PASSWORD=soos KEYCLOAK_IMPORT="/tmp/realm-export.json -Dkeycloak.profile.feature.upload_scripts=enabled -Dkeycloak.migration.strategy=OVERWRITE_EXISTING"
#ENV KEYCLOAK_USER=middleman KEYCLOAK_PASSWORD=soos