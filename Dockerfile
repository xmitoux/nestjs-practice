##### base #####
FROM node:20.13 as base
WORKDIR /app

COPY --chown=node:node . .
RUN npm install -g pnpm

##### dev #####
FROM base as dev
ENV NODE_ENV=development
EXPOSE 3000

COPY --chown=node:node package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY  . .

##### builder #####
FROM base as builder
ENV NODE_ENV=production

COPY --chown=node:node . .
RUN pnpm install --prod --frozen-lockfile \
    && pnpm build

##### prod #####
FROM node:20.13-bullseye-slim as prod
WORKDIR /app
EXPOSE 3000

COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/package.json  ./
COPY --chown=node:node --from=builder /app/prisma ./prisma/

USER node

CMD ["npm", "run", "start:migrate:prod"]
