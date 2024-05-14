from django.contrib import admin
from incidencias.models import Incidencia

# Register your models here.
@admin.register(Incidencia)
class Incidencia(admin.ModelAdmin):
    list_display = ('categoria', 'descripcion', 'estado', 'cliente', 'empleado', 'prioridad', 'observaciones', 'fecha_inicio', 'fecha_fin')