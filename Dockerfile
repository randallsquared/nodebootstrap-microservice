# Alpine Linux-based, tiny Node container:
FROM irakli/node-alpine:6.9.2

ADD ./ /opt/app
WORKDIR /opt/app

USER root

RUN adduser -s /bin/false -D appuser \
 && npm install \ 
 && chown -R appuser /opt/app \
 && npm install -g nodemon
 
USER appuser

ENV HOME_DIR=/opt/app \
    NODE_CLUSTERED=1 \
    NODE_ENV=production \
    NODE_HOT_RELOAD=0 \
    PORT=5501

EXPOSE 5501