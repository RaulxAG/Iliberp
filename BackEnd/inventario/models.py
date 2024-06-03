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
        precio_descuento (DecimalField, opcional): Precio del producto con descuento aplicado
        tipo (CharField): Tipo de producto hardware
        destacado (BooleanField): Indica si el producto está destacado o no
        foto (BinaryField): Foto del producto (almacenada como datos binarios)
    """
    TIPO = [
        ('portatil', 'Portátil'),
        ('placa', 'Placa'),
        ('teclado', 'Teclado'),
        ('raton', 'Ratón'),
        ('tablet', 'Tablet'),
    ]

    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    especificaciones = models.JSONField(blank=True, null=True)
    precio_descuento = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    tipo = models.CharField(max_length=20,choices=TIPO)
    destacado = models.BooleanField(default=False, null=True)
    foto = models.BinaryField(null=True, blank="True")

class Pedido(models.Model):

    ESTADOS = [
        (0, "Pendiente"),
        (1, "En preparación"),
        (2, "Pausa"),
        (3, "Preparado"),
        (4, "Enviado")
    ]

    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    fecha = models.DateField()
    direccion = models.TextField()
    estado = models.IntegerField(choices=ESTADOS)
    subtotal = models.FloatField(null=True)
    IVA = models.FloatField(null=True)
    total = models.FloatField(null=True)

    def __str__(self):
        return f"Pedido {self.id} - {self.cliente.user.username} - {self.get_estado_display()}"

class Linea(models.Model):
    articulo = models.ForeignKey(Producto, null=True, on_delete=models.SET_NULL)
    unidades = models.IntegerField()
    pedido = models.ForeignKey(Pedido, related_name='lineas', on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f"{self.unidades} x {self.articulo.nombre}"