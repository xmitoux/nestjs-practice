##### builder #####
FROM node:20.13-bullseye-slim as builder
WORKDIR /app

ENV NODE_ENV=production
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && \
    pnpm config set store-dir $PNPM_HOME/store/v3 --global

COPY --chown=node:node . .
RUN pnpm install --prod --frozen-lockfile && pnpm build

##### prod #####
FROM node:20.13-bullseye-slim as prod
WORKDIR /app
EXPOSE 3000

ENV NODE_ENV=production
ENV DATABASE_URL="postgres://postgres.bibjqyafzulueizuahxw:fHiZFiH3m3l1NNQY@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres"

COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/package.json  ./
COPY --chown=node:node --from=builder /app/prisma ./prisma/

USER node

CMD ["npm", "run", "start:migrate:prod"]
