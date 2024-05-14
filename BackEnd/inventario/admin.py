from django.contrib import admin
from .models import Producto, Linea, Pedido

# Register your models here.
@admin.register(Producto)
class Producto(admin.ModelAdmin):
    list_display = ('nombre', 'descripcion', 'precio', 'especificaciones', 'foto')

@admin.register(Linea)
class Linea(admin.ModelAdmin):
    list_display = ('articulo', 'unidades')

@admin.register(Pedido)
class Pedido(admin.ModelAdmin):
    list_display = ('cliente', 'lineas', 'fecha', 'direccion', 'estado', 'subtotal', 'IVA', 'total')
