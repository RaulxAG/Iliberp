
from django.contrib import admin
from django.urls import path,include
from iliberp import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',views.inicioView,name='inicioView'),
    path('', include("administracion.urls")),
    path('', include("fichaje.urls")),
    path('', include("incidencias.urls")),
    path('', include("inventario.urls")),
    path('', include("mensajeria.urls")),
    path('', include("trello.urls")),
]
