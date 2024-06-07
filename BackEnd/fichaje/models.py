from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Registro(models.Model):
    empleado = models.ForeignKey(User, on_delete=models.CASCADE)
    fecha = models.DateField()
    inicio = models.DateTimeField()
    fin = models.DateTimeField(null=True)

    def __str__(self):
        return "registro-" + str(self.id) + "-" + str(self.fecha) # formatear con el empleado mas adelante