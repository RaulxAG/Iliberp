from django.db import models

# Create your models here.
class Linea(models.Model):
    articulo = models.ForeignKey(Producto, on_delete=models.SET_NULL)
    precio_ud = articulo.precio
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
    estado = models.Choices(ESTADOS)
    subtotal = models.FloatField()
    IVA = models.FloatField()
    total = models.FloatField()