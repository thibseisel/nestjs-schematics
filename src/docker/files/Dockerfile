FROM node:20-alpine as base
WORKDIR /usr/src/app
# Use lightweight init process as entrypoint
# This is necessary to ensure that Node.js does not run as PID 1
RUN apk --no-cache add dumb-init
ENTRYPOINT [ "dumb-init", "--" ]

FROM base as development
# Install Node.js development dependencies
COPY package*.json ./
RUN npm clean-install --ignore-scripts --prefer-offline --no-audit
# Run application in development mode
CMD [ "npx", "nest", "start", "--watch", "--debug", "0.0.0.0:9229" ]

FROM development as builder
# Assemble production artifacts
COPY . .
RUN NODE_ENV=production npm run build

FROM base as production
# Install Node.js production dependencies
ENV NODE_ENV=production
COPY package*.json ./
RUN npm clean-install --ignore-scripts --prefer-offline --no-audit
# Run application in production mode
COPY --from=builder /usr/src/app/dist ./dist
CMD [ "node", "--enable-source-maps", "dist/main.js" ]
