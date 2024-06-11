FROM python:3.11

ENV PYTHONUNBUFFERED 1

RUN mkdir /app

# Directorio de trabajo
WORKDIR /app

# Copiar el archivo requirements.txt al directorio de trabajo
COPY . /app/

# Instalar las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Exponer el puerto que Django utilizará
EXPOSE 8000

# # Establecer las variables de entorno necesarias para Django
# ENV DJANGO_SETTINGS_MODULE=iliberp.settings
# Ejecutar las migraciones y el servidor de desarrollo
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]