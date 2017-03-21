FROM node:6.10-alpine
MAINTAINER Felipe Carlos Werlang <felipewer@gmail.com>

RUN apk add --no-cache mpg123

WORKDIR /code/

COPY package.json ./

RUN yarn install

EXPOSE 3000
VOLUME /code

CMD ["npm", "start"]