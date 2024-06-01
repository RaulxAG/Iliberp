from django.shortcuts import render
from incidencias.models import Incidencia
from administracion.models import Empleado, Cliente, Empresa
from django.contrib.auth.models import User
from datetime import datetime, timedelta, time
from django.http import JsonResponse
import json

# Create your views here.
def trello(request, category=None):
    #Obtener los diccionarios del model de Incidencias
    
    categories = Incidencia.CATEGORIAS
    clients = Cliente.objects.all()
    employees = Empleado.objects.all()
    enterprises = Empresa.objects.all()
    priorities = Incidencia.PRIORIDADES
    tasks = []

    # Filtrar las Incidencias por categoría a partir del diccionario categories
    if category is not None:

        # Buscar el valor asociado al nombre de la categoría dentro del diccionario CATEGORY
        category_index = None
        
        for index, (index_value, name) in enumerate(categories): # Recorremos el diccionario retornando clave/valor
            if name == category:
                category_index = index_value #Buscamos la categoria que coincida
                break

        if category_index is not None:
            incidents = Incidencia.objects.filter(categoria=category_index) #Filtrar los incidentes por la categoria encontrada

    else:
        incidents = Incidencia.objects.all() #Si no se proporciona un nombre de categoría, obtener todos los incidentes

    for incident in incidents:
        tasks.append(incident)

    tasks = sorted(tasks, key=lambda task: (task.prioridad, -datetime.combine(task.fecha_inicio, time.min).timestamp()))

    return render(request, "trello/trello.html", { #Renderizar la tabla de registros de las Tareas
        #Pasamos por parámetros las Incidencias, los clientes, los empleados, las empresas y las prioridades
        'tasks': tasks,
        'employees':employees,
        "priorities" : priorities,
        "enterprises" : enterprises
    })

# Funcion para actualizar el estado de una tarea con el evento Drag&Drop
def updateState(request):
    if request.method == 'POST': # Si existe una solicitud POST

        data = json.loads(request.body) # Decodificar los datos JSON del cuerpo de la solicitud

        element_id = data.get('element_id') # Obtener el ID del elemento (Tarea) soltado
        new_state = data.get('category_list') # Obtener el ID del contenedor que va a recibir el elemento (Tarea)

        incident = Incidencia.objects.get(pk=element_id) # Filtrar la Incidencia a partir de la Tarea movida
        stateIncidents = Incidencia.ESTADOS # Recoger el diccionario de Estado del model Incidencias

        print(new_state)

        for index, (index_value, name) in enumerate(stateIncidents): # Recorremos el diccionario retornando clave/valor

            print(name)
            if name == new_state: # Buscar coincidencia
                incident.estado = index_value # Actualizar el estado por el nuevo
                break

        incident.save() # Guardar la Incidencia para actualizar su estado

        response_data = {'mensaje': 'Actualizado con exito'}
        return JsonResponse(response_data,status=200)

        # # Devolver una respuesta JSON con los datos que interesen retornar
        # response_data = {
        #     'new_state': incident.state,
        #     }
        # return JsonResponse(response_data)
    else:
        response_data = {'error': 'Se esperaba una solicitud POST'} # Si la solicitud no es POST, devolver un error
        return JsonResponse(response_data, status=400)