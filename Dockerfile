FROM keymetrics/pm2:8-alpine
LABEL maintainer="Leonardo Habitzreuter <leo.habitzreuter@gmail.com>"
RUN addgroup -g 9999 appgroup && \
    adduser -u 9999 -G appgroup -D appuser && \
    mkdir /home/appuser/app && \
    chown appuser:appgroup /home/appuser/app && \
    chmod -R 777 /home/appuser
USER appuser
WORKDIR /home/appuser/app
COPY --chown=appuser:appgroup dist dist
COPY --chown=appuser:appgroup package.json package.json
COPY --chown=appuser:appgroup configs configs
ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV production
ENV authSecret tokenSecret
ENV dbUrl mongodb://leonardo:sysadmin@ds125588.mlab.com:25588/churrasco
ENV PM2_HOME .pm2
RUN npm install --production
EXPOSE 3001
CMD [ "npm", "run", "start:prod" ]