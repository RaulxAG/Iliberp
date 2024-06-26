from django.urls import path
from . import views

urlpatterns = [
    # Add more URL patterns as needed
    path('inicio/', views.inicio, name='inicio'),
    path('iniciarJornada/', views.iniciarJornada, name="iniciarJornada"),
    path('finalizarJornada/', views.finalizarJornada, name='finalizarJornada'),

    path('jornadas/', views.jornadas, name='jornadas'),
    path('jornadas-<int:id_employee>/', views.jornadas, name='jornadas'),

    path('generar_pdf/', views.generar_pdf, name='generar_pdf'),
    path('generar_pdf-<int:id_employee>/', views.generar_pdf, name='generar_pdf'),
]