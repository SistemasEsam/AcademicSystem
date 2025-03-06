FROM node:20-alpine AS builder
WORKDIR /app

# Instala compiladores nativos para Alpine
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm install --omit=dev --force # Ignora advertencias

COPY . .
RUN npm run build

# ----------------------
FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Instala producción y limpia caché
RUN npm install --omit=dev --force && \
    npm cache clean --force

# Variables críticas
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321

EXPOSE 4321
CMD ["npm", "run", "preview"]