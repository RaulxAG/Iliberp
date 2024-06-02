from django.urls import path
from . import views

urlpatterns = [
    # Add more URL patterns as needed

    # -------------------------- VIEW's Trello -------------------------
    path('trello/', views.trello, name="trello"),                                   # URL Página principal Trello
    path('trello-<str:category>/',  views.trello, name='trello'),                   # URL Página principal Trello filtrado por categoría
    path('updateState/', views.updateState, name='updateState'),                    # URL Para actualizar el estado de una tarea
    path('update_task/<int:task_id>/', views.update_task, name='update_task'),      # URL Para actualizar la información de una tarea
    path('updateSelectEnt/', views.updateSelectEnt, name='updateSelectEnt'),        # URL Para rellenar de manera dinámica los clientes de los filtros según la empresa seleccionada
    path('updateFilter/', views.updateFilter, name='updateFilter'),                 # URL Para actualizar los filtros seleccionados en Trello
]