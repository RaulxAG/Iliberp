from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Contacto(models.Model):
    nombre = models.CharField(max_length=100)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.nombre

class Mensaje(models.Model):
    emisor = models.ForeignKey(Contacto, on_delete=models.CASCADE)
    receptor = models.ForeignKey(Contacto, on_delete=models.CASCADE)
    texto = models.TextField(blank=True, null=True)
    archivo = models.FileField(upload_to='archivos/', blank=True, null=True)
    fecha_envio = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Mensaje de {self.emisor.nombre} - {self.fecha_envio}"

class Chat(models.Model):
    emisor = models.ForeignKey(Contacto, on_delete=models.CASCADE)
    receptor = models.ForeignKey(Contacto, on_delete=models.CASCADE)
    mensajes = models.ManyToManyField(Mensaje)

    def __str__(self):
        return f"Chat entre {self.usuario.username} y {self.contacto.nombre}"