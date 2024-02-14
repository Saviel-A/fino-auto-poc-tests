FROM node:18.18.2-slim

RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app

WORKDIR /usr/src/node-app

USER node

COPY --chown=node:node . .

CMD [ "node", "-r", "./.pnp.cjs", "src/index.js" ]
