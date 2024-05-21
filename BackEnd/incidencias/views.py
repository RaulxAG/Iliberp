from django.shortcuts import render
from .models import Incidencia
from administracion.models import Empleado,Cliente
from django.contrib.auth.models import User
import json
import random
from django.utils import timezone
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.forms.models import model_to_dict
from datetime import datetime

@csrf_exempt
def getIncidentsJSON(request,client_id):
    if request.method == 'GET':

        #Obtener el usuario
        client=Cliente.objects.get(pk=client_id)

        #Obtener las incidencias reportadas por ese cliente
        incidents= Incidencia.objects.filter(cliente=client)

        #Creamos el json con la info de las incidencias
        incidentJson =[]
        for incident in incidents:
            incident_info = {
                'id': incident.id,
                'categoria': incident.categoria,
                'descripcion': incident.descripcion,
                'estado': incident.estado,
                'empleado': incident.empleado.username if incident.empleado else None,
                'cliente': {
                    'nombre': incident.cliente.user.username,
                    'empresa': incident.cliente.empresa.nombre,
                    'telefono': incident.cliente.telefono1,
                },
                'prioridad': incident.prioridad,
                'observaciones': incident.observaciones,
                'fecha_inicio': incident.fecha_inicio.strftime('%Y-%m-%d'),
                'fecha_fin': incident.fecha_fin.strftime('%Y-%m-%d') if incident.fecha_fin else None,
            }
            incidentJson.append(incident_info)

        return JsonResponse(incidentJson, safe=False)

@csrf_exempt
def setIncidentJSON(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        client_id = data['client_id']
        categoria = data['categoria']
        descripcion = data['descripcion']
        observaciones = data['observaciones']

    client=Cliente.objects.get(pk=client_id)
    fecha_inicio = timezone.now().date()

    #Asignar el empleado aleatoriamente, teniendo en cuenta que el departamento tiene que ser igual a la categoria que ha indicado
    empleados = Empleado.objects.filter(departamento=categoria)

    # Verificar si hay empleados
    if empleados.exists():
        # Si hay empleados, elegir uno aleatorio
        empleado_asignado = random.choice(empleados)
    else:
        # Si no hay empleados, establecer empleado_asignado en None
        empleado_asignado = None

    new_incident = Incidencia.objects.create(
        cliente=client,
        categoria=categoria,
        descripcion=descripcion,
        observaciones=observaciones,
        fecha_inicio=fecha_inicio.strftime('%Y-%m-%d'),
        empleado=empleado_asignado,
        prioridad='baja',
    )

    incident = {
        'cliente': new_incident.cliente.id,
        'categoria': new_incident.categoria,
        'descripcion': new_incident.descripcion,
        'observaciones': new_incident.observaciones,
        'fecha_inicio': new_incident.fecha_inicio,
        'empleado': new_incident.empleado,
        'prioridad': new_incident.prioridad,
    }
   
    return JsonResponse(incident, safe=False)

@csrf_exempt    
def deleteIncidentJSON(request,incident_id):
    incidencia = Incidencia.objects.get(pk=incident_id)
    
    incidencia.delete()
    return JsonResponse({'message': 'La incidencia ha sido eliminada correctamente.'})

@csrf_exempt
def editIncidentJSON(request,incident_id):
    if request.method == 'POST':
        #Obtener la incidencia
        incidencia = Incidencia.objects.get(pk=incident_id)

        #Obtener los datos que se quieren editar por el body
        data = json.loads(request.body)

        categoria = data['categoria']
        descripcion = data['descripcion']
        observaciones = data['observaciones']

        # Actualizar la incidencia
        incidencia.categoria = categoria
        incidencia.descripcion = descripcion
        incidencia.observaciones = observaciones

        incidencia.save()

        #Crear un array con toda la información de la incidencia que se ha actualizado
        updated_incident = {
            'id': incidencia.id,
            'categoria': incidencia.categoria,
            'descripcion': incidencia.descripcion,
            'observaciones': incidencia.observaciones,
            'estado': incidencia.estado,
            'prioridad': incidencia.prioridad,
            'fecha_inicio': incidencia.fecha_inicio.strftime('%Y-%m-%d'),
            'fecha_fin': incidencia.fecha_fin.strftime('%Y-%m-%d') if incidencia.fecha_fin else None,
        }

        return JsonResponse(updated_incident, safe=False)