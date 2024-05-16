from django.db import models

from django.db import models

class Usuario(models.Model):
    """
    Modelo que representa a un usuario en el sistema.

    Campos:
        nombre (CharField): Nombre del usuario.
    """
    nombre = models.CharField(max_length=16)

class Chat(models.Model):
    """
    Modelo que representa un chat en el sistema.
    """
        

class UsuarioChat(models.Model):
    """
    Modelo que representa la relación entre usuarios y chats.

    Campos:
        usuario (ForeignKey): Usuario relacionado.
        chat (ForeignKey): Chat relacionado.
    """
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)

class Mensaje(models.Model):
    """
    Modelo que representa un mensaje enviado en un chat.

    Campos:
        usuario (ForeignKey): Usuario que envió el mensaje.
        chat (ForeignKey): Chat al que pertenece el mensaje.
        texto (CharField): Contenido del mensaje.
        fecha (DateField): Fecha en que se envió el mensaje.
        hora (TimeField): Hora en que se envió el mensaje.
    """
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
    texto = models.CharField(max_length=255)
    fecha = models.DateField()
    hora = models.TimeField()

