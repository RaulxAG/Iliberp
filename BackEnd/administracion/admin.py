from django.contrib import admin
from .models import Empresa, Cliente, Empleado

admin.site.register(Empresa)
admin.site.register(Cliente)
admin.site.register(Empleado)
