FROM keymetrics/pm2:8-alpine
LABEL maintainer="Leonardo Habitzreuter <leo.habitzreuter@gmail.com>"
VOLUME .
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install && \
    npm run build
EXPOSE 3001

CMD [ "pm2-dev", "start", "configs/appConfigs.json" ]