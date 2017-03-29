FROM hypriot/rpi-node:7.6
MAINTAINER Felipe Carlos Werlang <felipewer@gmail.com>

RUN apt-get update && apt-get -y --no-install-recommends install \
    sox \
    libsox-fmt-all \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/local/sales_buzzer/

COPY client ./client/
COPY server ./server/
COPY package.json ./
COPY webpack.config.js ./

RUN npm install -g webpack && \
    npm install && \
    mkdir -p sounds && \
    npm run build

EXPOSE 3000

CMD ["npm", "start"]