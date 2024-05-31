from django.db import models
from datetime import datetime
from django.utils.timezone import now
from administracion.models import Cliente, Empleado
from django.contrib.auth.models import User

class Line(models.Model):
    """
    Modelo que representa las líneas asociadas a incidencias, cada persona que participa en la incidencia es una línea

    Campos:
        empleado (ForeignKey a User): Clave foránea que hace referencia al empleado asociado a la línea.
        observaciones (CharField): Descripción o comentarios sobre la línea.
        comienzo (TimeField): Hora de inicio de la tarea.
        fin (TimeField): Hora de finalización de la tarea.
        tiempo (TimeFiled): Tiempo dedicado a la incidencia
    """

    empleado = models.ForeignKey(Empleado, default='empleado no existente', on_delete=models.SET_DEFAULT)
    observaciones = models.CharField(max_length=120)
    comienzo = models.TimeField(null=True, blank=True)
    fin = models.TimeField(null=True, blank=True)
    fecha = models.DateField(default=now)
    tiempo = models.TimeField(null=True, blank=True)

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
    estado = models.CharField(max_length=20, choices=ESTADOS,default='pendiente')
    cliente = models.ForeignKey(Cliente, on_delete=models.SET_NULL,null=True)
    empleado = models.ForeignKey(Empleado, on_delete=models.SET_NULL,null=True, blank=True)
    prioridad = models.CharField(max_length=10, choices=PRIORIDADES,null=True, blank=True)
    observaciones = models.TextField(blank=True, null=True)
    fecha_inicio = models.DateField(default=datetime.now)
    fecha_fin = models.DateField(blank=True, null=True)
    lines = models.ManyToManyField(Line, blank=True)


