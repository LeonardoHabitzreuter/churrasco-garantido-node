FROM keymetrics/pm2:8-alpine
LABEL maintainer="Leonardo Habitzreuter <leo.habitzreuter@gmail.com>"
COPY src app/src
WORKDIR /app
COPY package.json package.json
COPY configs configs
COPY gulpfile.js gulpfile.js
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install && npm run build
ENV NODE_ENV production
EXPOSE 3001
CMD [ "pm2-runtime", "start", "configs/appConfigs.json" ]