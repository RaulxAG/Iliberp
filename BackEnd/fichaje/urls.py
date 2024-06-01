from django.urls import path
from . import views

urlpatterns = [
    # Add more URL patterns as needed
    path('inicio/', views.inicio, name='inicio'),
]