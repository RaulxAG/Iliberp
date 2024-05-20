from django.contrib import admin

from .models import Mensaje, Chat,UsuarioChat

admin.site.register(Mensaje)
admin.site.register(Chat)
admin.site.register(UsuarioChat)