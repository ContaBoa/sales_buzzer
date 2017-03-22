FROM node:6.10-alpine
MAINTAINER Felipe Carlos Werlang <felipewer@gmail.com>

RUN apk add --no-cache mpg123

WORKDIR /code/

COPY client ./client/
COPY server ./server/
COPY package.json ./
COPY webpack.config.js ./

RUN npm install -g webpack && \
    npm install

RUN mkdir -p sounds && \
    npm run build

EXPOSE 3000
VOLUME /code

CMD ["npm", "start"]