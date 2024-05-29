from django.shortcuts import render,redirect
from django.contrib.auth.models import User
import json
import random
from django.utils import timezone
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.forms.models import model_to_dict
from datetime import datetime

from .models import Incidencia
from administracion.models import Empleado,Cliente,Empresa

def getIncidentsJSON(request,client_id):
    if request.method == 'POST':
        data = json.loads(request.body)
        client_id =data['client_id']

    #Obtener el usuario
    client=Cliente.objects.get(pk=client_id)

    #Obtener las incidencias reportadas por ese cliente
    incidents= Incidencia.objects.filter(cliente=client)

    #Creamos el json con la info de las incidencias
    incidentJson =[]
    for incident in incidents:
        incident_info = {
            'categoria': incident.categoria,
            'descripcion': incident.descripcion,
            'estado': incident.estado,
            'empleado': incident.empleado.username if incident.empleado else None,
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

        client_id =data['client_id']
        categoria =data['categoria']
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
        empleado=empleado_asignado
    )

    incident = {
        'cliente': new_incident.cliente.id,
        'categoria': new_incident.categoria,
        'descripcion': new_incident.descripcion,
        'observaciones': new_incident.observaciones,
        'fecha_inicio': new_incident.fecha_inicio,
        'empleado': new_incident.empleado,
    }
   
    return JsonResponse(incident, safe=False)
    
def deleteIncidentJSON(request,incident_id):
    incidencia = Incidencia.objects.get(pk=incident_id)
    
    incidencia.delete()
    return JsonResponse({'message': 'La incidencia ha sido eliminada correctamente.'})

@csrf_exempt
def editIncidentJSON(request,incident_id):
    #Obtener la incidencia
    incidencia = Incidencia.objects.get(pk=incident_id)

    #Obtener los datos que se quieren editar por el body
    if request.method == 'POST':
        data = json.loads(request.body)

        categoria =data['categoria']
        descripcion = data['descripcion']
        observaciones = data['observaciones']

        # Actualizar la incidencia
        incidencia.categoria = categoria
        incidencia.descripcion = descripcion
        incidencia.observaciones = observaciones

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





def incidentsView(request):
    incidents= Incidencia.objects.all()
    return render(request, 'incidencias/incidentsView.html', {'incidents': incidents})

def detailsIncident(request,incident_id=None):
    clients = Cliente.objects.all()
    departaments = Empleado.DEPARTAMENTOS
    priorities = Incidencia.PRIORIDADES
    enterprises = Empresa.objects.all()
    states = Incidencia.ESTADOS

    if incident_id :
        incident= Incidencia.objects.get(pk=incident_id)
        print(incident.prioridad)
        return render(request, 'incidencias/detailsIncident.html', {'incident': incident,
                                                                    'clients':clients,
                                                                    'departaments':departaments,
                                                                    'priorities':priorities,
                                                                    'enterprises':enterprises,
                                                                    'states':states})
    #Si no hay es la vista de crear uno nuevo
    else:
        return render(request, 'incidencias/detailsIncident.html', {'clients':clients,
                                                                    'departaments':departaments,
                                                                    'priorities':priorities,
                                                                    'enterprises':enterprises,
                                                                    'states':states})



@csrf_exempt
def saveIncident(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        incident_id = data.get('id')
        categoria = data.get('categoria')
        descripcion = data.get('descripcion')
        estado = data.get('estado')
        prioridad = data.get('prioridad')
        observaciones = data.get('observaciones')
        cliente_id = data.get('cliente')
        # empleado_id = data.get('empleado')
        fecha_inicio = data.get('fecha_inicio')
        fecha_fin = data.get('fecha_fin')
        accion = data.get('action')

        cliente_id = int(cliente_id)
        # Obtener objetos Cliente y Empleado
        cliente = Cliente.objects.get(pk=cliente_id) if cliente_id else None
        # empleado = Empleado.objects.get(id=empleado_id) if empleado_id else None
        print(cliente)
        if accion == "edit":
            incident_id = int(incident_id)
            incident = Incidencia.objects.get(pk=incident_id)

            incident.categoria = categoria
            incident.descripcion = descripcion
            incident.estado = estado
            incident.prioridad = prioridad
            incident.observaciones = observaciones
            incident.cliente = cliente
            # incident.empleado = empleado
            incident.fecha_inicio = fecha_inicio
            # incident.fecha_fin = fecha_fin
            print(incident.cliente)
            incident.save()

            response_data = {'success': True, 'message': 'Incidencia guardada exitosamente'}
            return JsonResponse(response_data)
        else:
            new_incident = Incidencia.objects.create(
                categoria=categoria,
                descripcion=descripcion,
                estado=estado,
                prioridad=prioridad,
                observaciones=observaciones,
                cliente=cliente,
                # empleado=empleado,
                fecha_inicio=fecha_inicio,
                # fecha_fin=fecha_fin
            )
            
            response_data = {'success': True, 'message': 'Incidencia creada exitosamente'}
            return JsonResponse(response_data)

def deleteIncident(request,incident_id):
    incident = Incidencia.objects.get(pk=incident_id)
    incident.delete()
    return redirect('incidentsView')