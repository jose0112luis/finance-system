# Utilizar la imagen base de Node.js 18.12.1
FROM node:18.12.1-alpine

# Crear un directorio de trabajo y establecerlo como directorio de trabajo actual
WORKDIR /app

# Copiar el archivo package.json y package-lock.json a la imagen y ejecutar npm install para instalar las dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto de la aplicación a la imagen
COPY . .

# Establecer las variables de entorno a través de un archivo .env
ENV PORT=3000
ENV POSTGRES_HOST=localhost
ENV POSTGRES_PORT=5432
ENV POSTGRES_USERNAME=root
ENV POSTGRES_PASSWORD=123456
ENV POSTGRES_DATABASE=d_nameb

# Exponer el puerto 3000 en la imagen
EXPOSE 3000

# Iniciar la aplicación
CMD [ "npm", "start" ]
