
from django.contrib import admin
from django.urls import path,include
from incidencias import views

urlpatterns = [
    path('getIncidentsJSON/<int:client_id>/',views.getIncidentsJSON,name='getIncidentsJSON'),
    path('setIncidentJSON/',views.setIncidentJSON,name='setIncidentJSON'),
    path('deleteIncidentJSON/<int:incident_id>/',views.deleteIncidentJSON,name='deleteIncidentJSON'),
    path('editIncidentJSON/<int:incident_id>/',views.editIncidentJSON,name='editIncidentJSON'),

    # URL INCIDENCIAS DJANGO
    path('incidents/', views.incidentsView, name='incidentsView'),                                          #Url vista general de las incidencias
    path('detailsIncident-<int:incident_id>/', views.detailsIncident, name='detailsIncident'),              #Url vista detalles incidencias y editarlos
    path('newIncident/', views.detailsIncident, name='detailsIncident'),   
    path('saveIncident/', views.saveIncident, name='saveIncident'),                                   #Url guardar incidencia nuevo o editado
    path('deleteIncident-<int:incident_id>/', views.deleteIncident, name='deleteIncident'),         #Url eliminar incidencia
]
