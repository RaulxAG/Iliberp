from django.db import models
from datetime import datetime
from administracion.models import Cliente, Empleado


class Incidencia(models.Model):
    """
    Modelo que representa las incidencias reportadas por los clientes.

    Campos:
        categoria (CharField): Categoría de la incidencia (almacenada como DICCIONARIO)
        descripcion (TextField): Descripción de la incidencia
        estado (CharField): Estado actual de la incidencia (almacenado como DICCIONARIO)
        prioridad (CharField): Prioridad de la incidencia (almacenado como DICCIONARIO)
        observaciones (TextField, opcional): Observaciones adicionales sobre la incidencia
        fecha_inicio (DateTimeField): Fecha y hora de inicio de la incidencia
        fecha_fin (DateTimeField, opcional): Fecha y hora de finalización de la incidencia
        cliente (ForeignKey): Cliente que reportó la incidencia
        empleado (ForeignKey): Empleado asignado a resolver la incidencia
    """

    CATEGORIAS = [
        ('web', 'Web'),
        ('programacion', 'Programación'),
        ('administracion', 'Administración'),
        ('ciberseguridad', 'Ciberseguridad'),
        ('telefonia', 'Telefonía'),
        ('sistemas', 'Sistemas'),
        ('taller', 'Taller'),
    ]

    ESTADOS = [
        ('pendiente',"Pendiente"),
		('proceso',"Proceso"),
		('pausa',"Pausa"),
        ('terminada',"Terminada")
    ]

    PRIORIDADES = [
        ('baja', 'Baja'),
        ('media', 'Media'),
        ('importante', 'Importante'),
        ('urgente', 'Urgente'),
    ]

    categoria = models.CharField(max_length=20, choices=CATEGORIAS)
    descripcion = models.TextField()
    estado = models.CharField(max_length=20, choices=ESTADOS)
    cliente = models.ForeignKey(Cliente, on_delete=models.NULL,null=true)
    empleado = models.ForeignKey(Empleado, on_delete=models.NULL,null=true)
    prioridad = models.CharField(max_length=10, choices=PRIORIDADES)
    observaciones = models.TextField(blank=True, null=True)
    fecha_inicio = models.DateTimeField(default=datetime.now)
    fecha_fin = models.DateTimeField(blank=True, null=True)
