from django.contrib import admin
from .models import Contacto, Mensaje, Chat

# Register your models here.
@admin.register(Contacto)
class Contacto(admin.ModelAdmin):
    list_display = ('nombre', 'usuario', 'cliente')

@admin.register(Mensaje)
class Mensaje(admin.ModelAdmin):
    list_display = ('emisor', 'receptor', 'texto', 'archivo', 'fecha_envio')

@admin.register(Chat)
class Chat(admin.ModelAdmin):
    list_display = ('emisor', 'receptor', 'mensajes')
