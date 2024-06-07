from django.urls import path
from . import views

urlpatterns = [
    # Add more URL patterns as needed
    path('inicio/', views.inicio, name='inicio'),
    path('iniciarJornada/', views.iniciarJornada, name="iniciarJornada"),
    path('finalizarJornada/', views.finalizarJornada, name='finalizarJornada'),

    path('jornadas/', views.jornadas, name='jornadas'),
    path('jornadas-<int:id_employee>/', views.jornadas, name='jornadas'),
]