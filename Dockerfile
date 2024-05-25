##### builder #####
FROM node:20.13-bullseye-slim as builder
WORKDIR /app

COPY --chown=node:node package.json pnpm-lock.yaml ./
COPY --chown=node:node prisma ./prisma/

RUN npm install -g pnpm \
    && pnpm install --frozen-lockfile \
    && pnpm build

COPY --chown=node:node . .

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
