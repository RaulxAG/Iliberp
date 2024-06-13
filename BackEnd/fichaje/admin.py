from django.contrib import admin
from .models import Registro

# Register your models here.
@admin.register(Registro)
class Registro(admin.ModelAdmin):
    list_display = ('empleado', 'fecha', 'inicio', 'fin')
