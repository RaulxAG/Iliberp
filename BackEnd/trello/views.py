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
        'employees': employees,
        "priorities": priorities,
        "categories": categories,
        "enterprises": enterprises
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


def update_task(request, task_id):
    if request.method == 'POST':
        data = json.loads(request.body)
        task = Incidencia.objects.get(pk=task_id)
        
        task.descripcion = data.get('descripcion', task.descripcion)
        task.observaciones = data.get('observaciones', task.observaciones)
        task.prioridad = data.get('prioridad', task.prioridad)
        
        empleado_id = data.get('empleado')
        if empleado_id:
            task.empleado_id = empleado_id
        else:
            task.empleado = None  # Si el campo empleado está vacío, asigna None

        task.categoria = data.get('categoria', task.categoria)
        
        fecha_fin = data.get('fecha_fin')
        if fecha_fin is not None:
            task.fecha_fin = fecha_fin
        
        task.fecha_inicio = data.get('fecha_inicio', task.fecha_inicio)
        
        task.save()

        empleado_username = task.empleado.user.username if task.empleado else None

        return JsonResponse({'success': True, 'empleado_username': empleado_username})
    
    return JsonResponse({'success': False, 'error': 'Invalid request method'})

# Funcion para actualizar los select de cliente, empresa u sede
def updateSelectEnt(request):
    if request.method == 'POST': # Si existe una solicitud POST
        data = json.loads(request.body) # Decodificar los datos JSON del cuerpo de la solicitud

        enterprise_id = data.get('enterprise') # Recoger el ID del elemento contenedor del filtro Empresa
        client_id = data.get('client') # Recoger el ID del elemento contenedor del filtro Clientes

        # Clientes que pertenecen a la empresa
        #Clientes de la empresa
        filtered_clients = Cliente.objects.filter(empresa__pk=enterprise_id)

        # Agregar detalles de clientes filtrados
        clients = []

        # Iterar sobre los clientes y agregarlos a la respuesta
        for client in filtered_clients:

            clients.append({
                'client': {
                    'id': client.id,
                    'full_name': client.user.username
                }
            })

        return JsonResponse(clients, safe=False)
    else:
        response_data = {'error': 'Se esperaba una solicitud POST'} # Si la solicitud no es POST, devolver un error
        return JsonResponse(response_data, status=400)

def updateFilter(request):
    categories = Incidencia.CATEGORIAS

    if request.method == 'POST': # Si existe una solicitud POST
        data = json.loads(request.body) # Decodificar los datos JSON del cuerpo de la solicitud
            
        # Obtener los filtros de la URL
        date_filter =  data.get('date')
        employee_filter =  data.get('employee')
        priority_filter =  data.get('priority')
        enterprise_filter = data.get('enterprise')
        client_filter =  data.get('client')
        search_filter = data.get('search')
        urlActual = data.get('urlActual')

        category_filter=None

        category_filter = urlActual.split('trello')[1].split('-')[-1].split('/')[0]

        category=0
        for index, (index_value, name) in enumerate(categories): #Recorremos el diccionario retornando clave/valor
            if name == category_filter:
                category = index_value 
                break

        tasks = Incidencia.objects.all()  # Obtener todas las Incidencias

        # Aplicar los filtros de manera lógica usando una comprensión de lista
        filtered_tasks = [task for task in tasks if 
            (not employee_filter or task.empleado_id == int(employee_filter)) and
            (not priority_filter or task.prioridad == priority_filter.lower()) and
            (not enterprise_filter or task.cliente.empresa_id == int(enterprise_filter)) and
            (not client_filter or task.cliente_id == int(client_filter)) and
            (not category or task.category == int(category))
        ]

        # Aplicar búsqueda si existe
        if search_filter:
            coincidents = []

            for task in filtered_tasks:
                client_phone_spaceless = ''.join(task.cliente.telefono1.split())

                infoCliente = task.cliente.user.username + " de " + task.cliente.empresa.nombre + client_phone_spaceless

                # Convertimos todo a minúsculas para hacer la búsqueda insensible a mayúsculas y minúsculas
                search_filter_lower = search_filter.lower()
                infoCliente_lower = infoCliente.lower()

                # Verificamos si el filtro de búsqueda coincide con alguna parte del cliente, localidad o nombre de la empresa
                if (search_filter_lower in infoCliente_lower):
                    coincidents.append(task)

            # Reemplazamos las tareas filtradas con las coincidencias encontradas
            filtered_tasks = coincidents
            
        # Una vez aplicados los filtros, si se requiere, ordenar por fecha
        if date_filter:
            if date_filter == 'recientes':
                filtered_tasks = sorted(filtered_tasks, key=lambda task: (task.prioridad, -datetime.combine(task.fecha_inicio, time.min).timestamp()))

            elif date_filter == 'antiguas':
                filtered_tasks = sorted(filtered_tasks, key=lambda task: (task.prioridad, datetime.combine(task.fecha_inicio, time.min).timestamp()))
        
        # Iterar sobre los clientes y agregarlos a la respuesta
        data = [{
            'id': task.id,
            'description': task.descripcion,
            'comments': task.observaciones,
            'employee_asigned': task.empleado.user.username if task.empleado else None,
            'client': {
                'full_name': task.cliente.user.username,
                'headquarter': {
                    'enterprise': task.cliente.empresa.nombre,
                },
                'phone': task.cliente.telefono1
            },
            'date': task.fecha_inicio.strftime('%d/%M/%Y %H:%m'), # Formatear Fecha
            'priority': task.prioridad,
            'state': task.estado,
            'category': task.categoria,
            'time_limit': task.fecha_fin.strftime('%d de %B de %Y') if task.fecha_fin else None, # Formatear Fecha
        } for task in filtered_tasks]
        
        return JsonResponse(data, safe=False) # Devolver aquí la respuesta
    else:
        response_data = {'error': 'Se esperaba una solicitud POST'} # Si la solicitud no es POST, devolver un error
        return JsonResponse(response_data, status=400)
