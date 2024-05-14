from django.db import models
from administracion.models import Cliente

# Create your models here.
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

class Linea(models.Model):
    articulo = models.ForeignKey(Producto, null=True, on_delete=models.SET_NULL)
    unidades = models.IntegerField()

class Pedido(models.Model):

    ESTADOS = [
        (0, "Pendiente"),
        (1, "En preparación"),
        (2, "Pausa"),
        (3, "Preparado"),
        (4, "Enviado")
    ]

    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    lineas = models.ForeignKey(Linea, on_delete=models.SET_NULL, null=True)
    fecha = models.DateField()
    direccion = models.TextField()
    estado = models.IntegerField(choices=ESTADOS)
    subtotal = models.FloatField()
    IVA = models.FloatField()
    total = models.FloatField()