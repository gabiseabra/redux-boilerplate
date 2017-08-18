FROM node:7-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install -s --no-progress

COPY . .

ARG SSR=true
ARG OFFLINE=true
ARG NODE_ENV=production

ENV NODE_ENV=$NODE_ENV

RUN npm run build && npm prune

EXPOSE 80

CMD npm run start
