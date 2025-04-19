FROM --platform=linux/amd64 node:22-bookworm-slim as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN rm -rf .git/hooks

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD node dist/main.js
