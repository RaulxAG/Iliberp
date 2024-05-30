from django.contrib import admin
from .models import Empresa, Cliente, Empleado

# Register your models here.
@admin.register(Empresa)
class Empresa(admin.ModelAdmin):
    list_display = ('nombre', 'cif_nif', 'direccion', 'email', 'telefono1', 'telefono2')

@admin.register(Cliente)
class Cliente(admin.ModelAdmin):
    list_display = ('user', 'dni', 'telefono1', 'telefono2', 'foto_perfil', 'empresa')

@admin.register(Empleado)
class Empleado(admin.ModelAdmin):
    list_display = ('user', 'dni', 'telefono', 'departamento', 'foto_perfil')