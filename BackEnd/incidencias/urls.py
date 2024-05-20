
from django.contrib import admin
from django.urls import path,include
from incidencias import views

urlpatterns = [
    path('getIncidentsJSON/<int:client_id>/',views.getIncidentsJSON,name='getIncidentsJSON'),
    path('setIncidentJSON/',views.setIncidentJSON,name='setIncidentJSON'),
    path('deleteIncidentJSON/<int:incident_id>/',views.deleteIncidentJSON,name='deleteIncidentJSON'),
    path('editIncidentJSON/<int:incident_id>/',views.editIncidentJSON,name='editIncidentJSON'),
]
