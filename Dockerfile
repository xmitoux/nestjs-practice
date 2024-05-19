FROM node:lts

WORKDIR /app/backend

COPY --chown=node:node package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
RUN npx prisma migrate dev

COPY --chown=node:node . .

USER node

EXPOSE 3000

CMD ["pnpm", "start:dev"]
