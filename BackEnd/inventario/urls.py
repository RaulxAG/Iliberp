
from django.contrib import admin
from django.urls import path
from inventario import views

urlpatterns = [
    path('api/productos/', views.productos_api, name='productos-api'),
]
