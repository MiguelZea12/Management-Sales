# Etapa de construcción del frontend
FROM node:20-alpine as build-frontend
WORKDIR /app_front
COPY ./app_front/package.json ./
COPY ./app_front/package-lock.json ./
RUN npm install
COPY ./app_front ./
RUN npm run build

# Etapa de construcción del backend
FROM python:3.9-slim
WORKDIR /app

# Instalar dependencias
COPY ./requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código del backend
COPY . .

# Copiar los archivos estáticos del frontend construidos
COPY --from=build-frontend /app_front/dist /static

# Establecer variables de entorno para Flask
ENV FLASK_APP=run.py
ENV FLASK_RUN_HOST=0.0.0.0

# Exponer el puerto para Flask
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["python", "run.py"]
