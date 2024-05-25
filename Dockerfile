FROM node:20.13-bullseye-slim
# ENV NODE_ENV=production

WORKDIR /app/backend

COPY --chown=node:node . .

RUN npm install -g pnpm \
    && pnpm install --frozen-lockfile \
    && pnpm build

USER node

EXPOSE 3000

CMD ["pnpm", "start:migrate:prod"]
