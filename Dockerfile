FROM node:lts-alpine as client-builder
WORKDIR /client
COPY . .
RUN npm link
RUN npm i -w apps/client
RUN npm run build -w apps/client

FROM node:lts-alpine as server-builder
WORKDIR /server
COPY . .
RUN npm link
RUN npm i -w apps/server
RUN npm run build -w apps/server

FROM node:lts-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV STATIC_PATH=/static
COPY --from=server-builder /server/node_modules ./node_modules
COPY --from=server-builder /server/apps/server/dist ./dist
COPY --from=client-builder /client/apps/client/dist ${STATIC_PATH}

CMD ["node", "dist/index.js"]
