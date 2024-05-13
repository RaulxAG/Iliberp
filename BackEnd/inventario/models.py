from django.db import models

class Producto(models.Model):
    """
    Modelo que representa los productos en la tienda.

    Campos:
        nombre (CharField): Nombre del producto
        descripcion (TextField): Descripción del producto
        precio (DecimalField): Precio del producto
        especificaciones (JSONField): Especificaciones del producto (almacenadas como JSON)
        foto (BinaryField): Foto del producto (almacenada como datos binarios)
    """

    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    especificaciones = models.JSONField()
    foto = models.BinaryField()
