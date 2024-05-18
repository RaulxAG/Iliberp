from django.contrib import admin
from .models import Producto, Linea, Pedido

# Inline para mostrar las líneas dentro del pedido
class LineaInline(admin.TabularInline):
    model = Linea
    extra = 1

@admin.register(Producto)
class Producto(admin.ModelAdmin):
    list_display = ('nombre', 'descripcion', 'precio', 'especificaciones', 'precio_descuento', 'tipo', 'destacado', 'foto')

@admin.register(Linea)
class Linea(admin.ModelAdmin):
    list_display = ('articulo', 'unidades', 'pedido')

@admin.register(Pedido)
class Pedido(admin.ModelAdmin):
    list_display = ('cliente', 'fecha', 'direccion', 'estado', 'subtotal', 'IVA', 'total')
    inlines = [LineaInline]

    # (Opcional) Método para mostrar un resumen de las líneas en list_display
    def lineas_resumen(self, obj):
        return ", ".join([f"{linea.unidades} x {linea.articulo.nombre}" for linea in obj.lineas.all()])

    lineas_resumen.short_description = 'Resumen de Líneas'