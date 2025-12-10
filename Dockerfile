FROM node:20 AS server-build
WORKDIR /app

# install deps and copy source code
COPY package*.json ./
RUN npm ci
COPY . .

RUN npm run build

# prod
FROM node:20-alpine
WORKDIR /app

# install only prod deps
COPY package*.json ./
RUN npm ci --production && npm cache clean --force

COPY --from=server-build /app/dist ./dist
COPY --from=server-build /app/client ./client

ENV NODE_ENV=production
ENV PORT=8080

CMD ["node", "dist/index.js"]
