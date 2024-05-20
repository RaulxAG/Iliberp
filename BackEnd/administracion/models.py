from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Empresa(models.Model):
    """
    Modelo que representa los datos de las empresas clientes
    Campos:
        nombre (CharField): Nombre de la empresa
        cif_nif (Charfield): Cif o nif (en caso de autónomo) de la empresa
        direccion (CharField): Dirección de la empresa
        email (EmailField): Correo electrónico de la empresa.
        telefono1 (CharField): Número de teléfono principal de la empresa (se usa char para permitir el prefijo con +)
        telefono2 (CharField): Segundo número de teléfono de la empresa (opcional)
    """

    nombre = models.CharField(max_length=100)
    cif_nif = models.CharField(max_length=20)
    direccion = models.CharField(max_length=255)
    email = models.EmailField(max_length=100)
    telefono1 = models.CharField(max_length=20)
    telefono2 = models.CharField(max_length=20, blank=True, null=True)


class Cliente(models.Model):
    """
    Modelo que representa los datos de los clientes

    Campos:
        nombre (CharField): Nombre del cliente
        apellidos (CharField): Apellidos del cliente
        dni (CharField): DNI del cliente
        correo (EmailField): Correo electrónico del cliente
        telefono1 (CharField): Número de teléfono principal del cliente
        telefono2 (CharField): Segundo número de teléfono del cliente (opcional)
        foto_perfil (BinaryField): Foto de perfil del cliente (opcional)
        empresa (ForeignKey): Relación con el modelo Empresa para asociar el cliente con una empresa
    """
    # Relación con el modelo User para el usuario de Django. 
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    dni = models.CharField(max_length=20)
    telefono1 = models.CharField(max_length=20)
    telefono2 = models.CharField(max_length=20, blank=True, null=True) 
    foto_perfil = models.BinaryField(blank=True, null=True) 
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)  # Relación con el modelo Empresa