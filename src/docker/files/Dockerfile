FROM node:22-alpine AS base
WORKDIR /usr/src/app
# Use lightweight init process as entrypoint
# This is necessary to ensure that Node.js does not run as PID 1
RUN apk --no-cache add dumb-init
ENTRYPOINT [ "dumb-init", "--" ]

FROM base AS development
# Install Node.js development dependencies
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,id=npm,target=/root/.npm \
    npm clean-install --ignore-scripts --prefer-offline --no-audit

FROM development AS builder
# Assemble production artifacts
COPY . .
RUN NODE_ENV=production npx nest build

FROM base AS production
# Install Node.js production dependencies
ENV NODE_ENV=production
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,id=npm,target=/root/.npm \
    npm clean-install --ignore-scripts --prefer-offline --no-audit
# Run application in production mode
COPY --from=builder /usr/src/app/dist ./dist
USER node
EXPOSE 3000
CMD [ "node", "--enable-source-maps", "dist/main.js" ]
