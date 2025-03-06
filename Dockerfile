# Usa Node.js 18 como base
FROM node:18-bullseye


# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expone el puerto que usa Astro (4321)
EXPOSE 4321

# Ejecuta el comando para iniciar el proyecto
CMD ["npm", "run", "dev"]
