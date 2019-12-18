FROM node:alpine

COPY ./.clasp*.json /root/

RUN apk update \
    && apk upgrade \
    && apk add --no-cache \
    git \
    && rm -rf /var/cache/apk/*

RUN npm install --no-progress -g typescript
RUN npm install --no-progress -g @google/clasp @types/google-apps-script

WORKDIR /usr/src/app

ENTRYPOINT ["/bin/sh", "-C"]
