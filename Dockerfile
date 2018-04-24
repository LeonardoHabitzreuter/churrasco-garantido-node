FROM keymetrics/pm2:8-alpine
LABEL maintainer="Leonardo Habitzreuter <leo.habitzreuter@gmail.com>"
COPY dist /app/src
WORKDIR /app
COPY package.json package.json
COPY configs configs
ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV production
RUN npm install --production
EXPOSE 3001
CMD [ "npm", "run", "start:prod", "--no-daemon" ]