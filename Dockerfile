# --- Stage 1 : Build ---
FROM node:25-bookworm-slim AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build
RUN npm prune --production

# --- Stage 2 : Runner (Rootless) ---
FROM node:25-bookworm-slim

WORKDIR /usr/src/app

# On copie les fichiers en donnant la propriété à l'utilisateur non-root 'node'
COPY --chown=node:node --from=builder /usr/src/app/dist ./dist
COPY --chown=node:node --from=builder /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=builder /usr/src/app/package.json ./package.json
COPY --chown=node:node --from=builder /usr/src/app/src/gcs/gcs-key.json ./dist/src/gcs/gcs-key.json

# Mode rootless
RUN groupadd -g 1003 nodejs && \
    useradd -u 1003 -g nodejs -s /bin/sh gcs-api-gateway

RUN chown -R gcs-api-gateway:nodejs /usr/src/app

USER gcs-api-gateway

EXPOSE 3000

CMD ["node", "dist/main"]