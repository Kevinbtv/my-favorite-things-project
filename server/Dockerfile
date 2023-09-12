FROM node:18-alpine

ENV APP_DIR /app
WORKDIR $APP_DIR
RUN apk add bash vim
COPY package*.json $APP_DIR/
RUN npm ci && npm cache clean --force

COPY .env $APP_DIR/
COPY tsconfig.json $APP_DIR/
COPY prisma $APP_DIR/prisma
COPY src $APP_DIR/src
RUN npx prisma generate
COPY entrypoint.sh /entrypoint.sh    
RUN chmod +x /entrypoint.sh          

CMD ["/entrypoint.sh"]