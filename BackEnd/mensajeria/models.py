from django.db import models
from django.contrib.auth.models import User
from administracion.models import Cliente

# Create your models here.
class Contacto(models.Model):
    nombre = models.CharField(max_length=100)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.nombre

class Mensaje(models.Model):
    emisor = models.ForeignKey(Contacto, on_delete=models.CASCADE, related_name='mensajes_enviados')
    receptor = models.ForeignKey(Contacto, on_delete=models.CASCADE, related_name='mensajes_recibidos')
    texto = models.TextField(blank=True, null=True)
    archivo = models.FileField(upload_to='archivos/', blank=True, null=True)
    fecha_envio = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Mensaje de {self.emisor.nombre} - {self.fecha_envio}"

class Chat(models.Model):
    emisor = models.ForeignKey(Contacto, on_delete=models.CASCADE, related_name='chats_enviados')
    receptor = models.ForeignKey(Contacto, on_delete=models.CASCADE, related_name='chats_recibidos')
    mensajes = models.ManyToManyField(Mensaje)

    def __str__(self):
        return f"Chat entre {self.emisor.nombre} y {self.receptor.nombre}"