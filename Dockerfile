FROM node:20.13-bullseye-slim
# ENV NODE_ENV=production
WORKDIR /app/backend
EXPOSE 3000

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && \
    pnpm config set store-dir $PNPM_HOME/store/v3 --global

COPY --chown=node:node . .
RUN pnpm install --prod --frozen-lockfile && pnpm build

USER node

CMD ["npm", "run", "start:migrate:prod"]
