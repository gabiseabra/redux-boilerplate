FROM node:7-slim

WORKDIR /app

COPY package.json yarn.lock .yarnclean ./

RUN yarn install --pure-lockfile

COPY . .

ARG SSR=true
ARG OFFLINE=true
ARG NODE_ENV=production

ENV NODE_ENV=$NODE_ENV

RUN yarn run build && \
		yarn install --force \
								 --ignore-scripts \
								 --prefer-offline

EXPOSE 80

CMD npm run start
