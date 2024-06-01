from django.urls import path
from . import views

urlpatterns = [
    # Add more URL patterns as needed

    # -------------------------- VIEW's Trello -------------------------
    path('trello/', views.trello, name="trello"),                           # URL Página principal Trello
    path('trello-<str:category>/',  views.trello, name='trello'),          # URL Página principal Trello filtrado por categoría
    path('updateState/', views.updateState, name='updateState'),            # URL Para actualizar el estado de una tarea
]