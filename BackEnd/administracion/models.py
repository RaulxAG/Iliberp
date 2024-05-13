from django.db import models

class Empresa(models.Model):
    """
    Modelo que representa los datos de las sedes de las empresas.

    Campos:
        cifNif (CharField): Numero de identificacion fiscal de la empresa.
        cantIncident (IntegerField): Total de incidencias que lleva hechas la empresa.
        cuota (CharField): Cuota que tiene contratada la empresa.
        nombre (TextField): Nombre de la empresa.
        telefono (CharField): Número de teléfono de la empresa, se usa char parapermitir el prefijo con +
        correo (CharField): Correo de la empresa.
    """

    cifNif = models.CharField(max_length=9,default=0)
    cantIncident = models.IntegerField(default=0)
    email = models.CharField(max_length=20)
    phone1 = models.CharField(max_length=13)
    phone2 = models.CharField(max_length=13,default=0)
    time = models.TimeField(default=0,null=True)
    locality = models.CharField(max_length=50)
    # BONO por determinar
    time_left = models.TimeField(default=0, null=True)

    enterprise = models.ForeignKey(Enterprise,on_delete=models.CASCADE, related_name='branchs')

