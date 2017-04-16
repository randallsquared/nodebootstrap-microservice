# Alpine Linux-based, tiny Node container:
FROM irakli/node-alpine:6.9.2

ADD ./ /opt/code
WORKDIR /opt/code

USER root

RUN adduser -s /bin/false -u 7007 -D appuser \
 && npm install -g nodemon \
 && npm install \
 && chown -R appuser /opt/code

USER appuser

EXPOSE 3000

ENV HOME_DIR=/opt/code \
    NODE_CLUSTERED=1 \
    NODE_ENV=production \
    NODE_HOT_RELOAD=0 \
    NB_IS_CONTAINER=1