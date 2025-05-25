# build react client
FROM node:20 AS client-build
WORKDIR /client
COPY ./client ./client
RUN cd client && npm install && npm run build

# build express api
FROM node:20 AS server-build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# create prod image
FROM node:18-alpine
WORKDIR /app

# copy compiled api and client
COPY --from=server-build /app /app
COPY --from=client-build /client/client/dist /app/client/dist

ENV NODE_ENV=production
ENV PORT=8080

CMD ["node", "dist/index.js"]
