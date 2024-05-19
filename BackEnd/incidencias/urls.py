
from django.contrib import admin
from django.urls import path,include
from incidencias import views

urlpatterns = [
    path('getIncidents/<int:client_id>/',views.getIncidents,name='getIncidents'),
    path('setIncident/',views.setIncident,name='setIncident'),
    path('deleteIncident/<int:incident_id>/',views.deleteIncident,name='deleteIncident'),
    path('editIncident/<int:incident_id>/',views.editIncident,name='editIncident'),
]
