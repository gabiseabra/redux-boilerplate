FROM node:7

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ARG SSR=true
ARG OFFLINE=true

RUN npm run build

EXPOSE 80

CMD npm run start
