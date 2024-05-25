##### builder #####
FROM node:20.13-bullseye-slim as builder
WORKDIR /app
EXPOSE 3000

ENV NODE_ENV=production
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && \
    pnpm config set store-dir $PNPM_HOME/store/v3 --global

COPY --chown=node:node . .
RUN pnpm install --prod --frozen-lockfile && pnpm build

USER node

CMD ["npm", "run", "start:migrate:prod"]
