##### dev-base #####
FROM node:20.13 as dev-base
WORKDIR /app
EXPOSE 3000

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm

##### dev #####
FROM dev-base as dev
ENV NODE_ENV=development

COPY --chown=node:node package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile && \
    chown -R node:node $PNPM_HOME && \
    chown -R node:node ./node_modules
COPY --chown=node:node  . .

USER node

RUN pnpm config set store-dir $PNPM_HOME/store --global

##### builder #####
FROM node:20.13-bullseye-slim as builder
WORKDIR /app
ENV NODE_ENV=production

COPY . .
RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile && \
    pnpm build

##### prod #####
FROM node:20.13-bullseye-slim as prod
WORKDIR /app
EXPOSE 3000
ENV NODE_ENV=production

COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/package.json  ./
COPY --chown=node:node --from=builder /app/prisma ./prisma/

USER node

CMD ["npm", "run", "start:migrate:prod"]
