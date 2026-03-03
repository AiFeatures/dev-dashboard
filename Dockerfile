FROM node:22-alpine

RUN apk add --no-cache git

WORKDIR /app

COPY package.json ./
RUN npm install --production

COPY server.js ./
COPY public/ ./public/
COPY scripts/ ./scripts/

# Mount repos volume at /repos
ENV REPOS_ROOT=/repos
ENV DASHBOARD_PORT=7777

EXPOSE 7777

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s \
  CMD wget -q --spider http://localhost:7777/api/repos || exit 1

CMD ["node", "server.js"]
