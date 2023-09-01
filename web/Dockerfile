FROM node:18-alpine

ENV APP_DIR /app
WORKDIR $APP_DIR
RUN apk add bash vim
COPY package*.json $APP_DIR/
RUN npm ci && npm cache clean --force
COPY tsconfig.json $APP_DIR/
COPY astro.config.mjs $APP_DIR/
COPY src $APP_DIR/src


ENTRYPOINT ["npm", "run", "dev"]