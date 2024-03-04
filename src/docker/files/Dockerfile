FROM node:20-alpine

WORKDIR /usr/src/app

RUN apk --no-cache add dumb-init

COPY package*.json ./
RUN npm clean-install --ignore-scripts --prefer-offline --no-audit

COPY . .
ENV NODE_ENV=production
RUN npm run build

EXPOSE 3000
ENTRYPOINT [ "dumb-init", "--" ]
CMD [ "node", "--enable-source-maps", "dist/main.js" ]
