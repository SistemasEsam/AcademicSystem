FROM node:20-alpine AS builder
WORKDIR /app

# Instala dependencias de compilación (crítico para Alpine)
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm install --omit=dev

COPY . .
RUN npm run build

# ----------------------
FROM node:20-alpine
WORKDIR /app

# Copia solo lo necesario
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Instala producción y limpia caché
RUN npm install --omit=dev && npm cache clean --force

# Variables de entorno esenciales
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321

EXPOSE 4321
CMD ["npm", "run", "preview"]