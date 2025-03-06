# ----------------------
# Etapa de Construcción (Node 20)
# ----------------------
    FROM node:20-alpine AS builder
    WORKDIR /app
    
    COPY package*.json ./
    RUN npm install --omit=dev
    
    COPY . .
    RUN npm run build
    
    # ----------------------
    # Etapa de Producción
    # ----------------------
    FROM node:20-alpine
    WORKDIR /app
    
    COPY --from=builder /app/dist ./dist
    COPY --from=builder /app/package*.json ./
    
    RUN npm install --omit=dev
    
    EXPOSE 4321
    CMD ["npm", "run", "preview"]  