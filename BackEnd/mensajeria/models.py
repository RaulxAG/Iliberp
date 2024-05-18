from django.db import models
from django.contrib.auth.models import User

class Chat(models.Model):
    """
    Modelo que representa un chat en el sistema.
    receptor ( ForeignKey) Persona a la que le queremos mandar el mensaje
    """
    
class UsuarioChat(models.Model):
    """
    Modelo que representa la relación entre usuarios y chats.

    Campos:
        usuario (ForeignKey): Usuario relacionado.
        chat (ForeignKey): Chat relacionado.
    """
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
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
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, db_column='chat_id')
    texto = models.CharField(max_length=255)
    fecha = models.DateField()
    hora = models.TimeField()

