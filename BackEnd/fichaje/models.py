from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Registro(models.Model):
    empleado = models.ForeignKey(User, on_delete=models.CASCADE)
    fecha = models.DateField()
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()
    horas_trabajadas = models.TimeField()

    def calHorasTrabajadas(self):
        diferencia = self.hora_fin - self.hora_inicio
        self.horas_trabajadas = diferencia.total_seconds() / 3600 # convertir a horas
        self.save()

    def __str__(self):
        return "registro-" + self.id + "-" + self.fecha # formatear con el empleado mas adelante