FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4321

# Variables de entorno (opcional si ya las defines en compose)
ENV DB_HOST=149.28.34.53 \
    DB_USER=acadcbba_vins \
    DB_PASSWORD=Vins8039368 \
    DB_NAME=acadcbba_esamdb

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "4321"]