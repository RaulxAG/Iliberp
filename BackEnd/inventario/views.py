from django.shortcuts import render

from django.http import JsonResponse
from .models import Producto

def productos_api(request):
    productos = Producto.objects.all()
    productos_json = [
        {
            'nombre': producto.nombre,
            'descripcion': producto.descripcion,
            'precio': producto.precio,
            'tipo' : producto.tipo,
            
        }
        for producto in productos
    ]
    return JsonResponse(productos_json, safe=False)

