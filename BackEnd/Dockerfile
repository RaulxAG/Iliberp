# Define la imagen base basada en Debian/Ubuntu
FROM python:3.9-slim

# Configura el directorio de trabajo
WORKDIR /app

# Instala las dependencias del sistema operativo
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    make \
    wkhtmltopdf \
    xvfb \
    fontconfig \
    libjpeg-dev \
    default-libmysqlclient-dev \
    && rm -rf /var/lib/apt/lists/*

# Actualiza pip a la última versión
RUN pip install --upgrade pip

# Copia el archivo de requerimientos
COPY requirements.txt .

# Instala las dependencias del proyecto
RUN pip install -r requirements.txt

# Copia el contenido del directorio actual al directorio de trabajo en la imagen
COPY . .

# Expone el puerto 8000 (o el puerto que uses para ejecutar Django)
EXPOSE 8000

# Comando para ejecutar la aplicación
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
