from django.contrib import admin
from .models import Empresa, Cliente

# Register your models here.
@admin.register(Empresa)
class Empresa(admin.ModelAdmin):
    list_display = ('nombre', 'cif_nif', 'direccion', 'email', 'telefono1', 'telefono2')

@admin.register(Cliente)
class Cliente(admin.ModelAdmin):
    list_display = ('nombre', 'apellidos', 'dni', 'correo', 'telefono1', 'telefono2', 'foto_perfil', 'empresa')