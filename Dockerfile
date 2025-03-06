# ----------------------
# Etapa de Construcción
# ----------------------
    FROM node:18-alpine AS builder
    WORKDIR /app
    
    # Copia solo las dependencias para caché eficiente
    COPY package*.json ./
    RUN npm install --omit=dev  # Ignora dependencias de desarrollo
    
    # Copia el código y construye
    COPY . .
    RUN npm run build  # Genera la versión optimizada para producción
    
    # ----------------------
    # Etapa de Producción
    # ----------------------
    FROM node:18-alpine
    WORKDIR /app
    
    # Copia solo lo necesario desde la etapa de construcción
    COPY --from=builder /app/dist ./dist
    COPY --from=builder /app/package*.json ./
    
    # Instala solo dependencias de producción
    RUN npm install --omit=dev
    
    # Variables y puertos
    EXPOSE 4321
    CMD ["npm", "run", "preview"]  # Ejecuta el servidor de producción