from django.shortcuts import render,redirect
from django.contrib.auth.models import User
import json
import random
from django.utils import timezone
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.forms.models import model_to_dict
from datetime import datetime,timedelta
from .models import Incidencia,Line
from administracion.models import Empleado,Cliente,Empresa
from django.contrib.auth.decorators import login_required

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
    departaments = Empleado.DEPARTAMENTOS
    states = Incidencia.ESTADOS
    clients = Cliente.objects.all()
    empleados = Empleado.objects.all()
    priorities = Incidencia.PRIORIDADES
    
    incidents = Incidencia.objects.all()
    return render(request, 'incidencias/incidentsView.html', {
        'incidents': incidents,
        'clients': clients,
        'departaments': departaments,
        'priorities': priorities,
        'states': states,
        'empleados': empleados
    })

def reloadIncident(request, incident_id=None, line_id=None):
    return redirect('detailsIncident', incident_id=incident_id)

def detailsIncident(request,incident_id=None):
    clients = Cliente.objects.all()
    departaments = Empleado.DEPARTAMENTOS
    priorities = Incidencia.PRIORIDADES
    enterprises = Empresa.objects.all()
    states = Incidencia.ESTADOS
    
    if incident_id :
        incident= Incidencia.objects.get(pk=incident_id)
        lines = incident.lines.all()
        total_time = timedelta()
        for line in lines:
            if line.tiempo:
                total_time += timedelta(hours=line.tiempo.hour, minutes=line.tiempo.minute)
        
        # Convertir a horas y minutos
        total_seconds = int(total_time.total_seconds()) # Convertir el tiempo total a segundos
        hours, remainder = divmod(total_seconds, 3600) # Obtener las horas y el restante en segundos
        minutes, seconds = divmod(remainder, 60) # Obtener los minutos y los segundos restantes
        timePattern = f"{hours}h {minutes}min"

        print(timePattern)
        return render(request, 'incidencias/detailsIncident.html', {'incident': incident,
                                                                    'clients':clients,
                                                                    'departaments':departaments,
                                                                    'priorities':priorities,
                                                                    'enterprises':enterprises,
                                                                    'states':states,
                                                                    'lines':lines,
                                                                    'total_time':timePattern})
    #Si no hay es la vista de crear uno nuevo
    else:
        return render(request, 'incidencias/detailsIncident.html', {'clients':clients,
                                                                    'departaments':departaments,
                                                                    'priorities':priorities,
                                                                    'enterprises':enterprises,
                                                                    'states':states})




def saveIncident(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        incident_id = data.get('idIncident')
        categoria = data.get('categoria')
        descripcion = data.get('descripcion')
        estado = data.get('estado')
        prioridad = data.get('prioridad')
        observaciones = data.get('observaciones')
        cliente_id = data.get('cliente')
        fecha_inicio = data.get('fecha_inicio')
        fecha_fin = data.get('fecha_fin')
        accion = data.get('action')

        cliente_id = int(cliente_id)
        # Obtener objetos Cliente
        cliente = Cliente.objects.get(pk=cliente_id) if cliente_id else None
        
        fecha_fin = fecha_fin if fecha_fin else None
        
        #Obtener usuario logueado
        user = request.user
        #Obtener empleado
        empleado = Empleado.objects.get(user=user)

        # Verificar que el usuario esté autenticado
        if not user.is_authenticated:
            response_data = {'error': 'No estas logueado'}
            return JsonResponse(response_data)
        print(user)
        if accion == "edit":
            incident_id = int(incident_id)
            incident = Incidencia.objects.get(pk=incident_id)

            incident.categoria = categoria
            incident.descripcion = descripcion
            incident.estado = estado
            incident.prioridad = prioridad
            incident.observaciones = observaciones
            incident.cliente = cliente
            incident.empleado = empleado
            incident.fecha_inicio = fecha_inicio
            incident.fecha_fin = fecha_fin
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
                empleado=empleado,
                fecha_inicio=fecha_inicio,
                fecha_fin=fecha_fin
            )
            
            response_data = {'success': True, 'message': 'Incidencia creada exitosamente'}
            return JsonResponse(response_data)

def deleteIncident(request,incident_id):
    incident = Incidencia.objects.get(pk=incident_id)
    incident.delete()
    return redirect('incidentsView')

@csrf_exempt
def saveLineIncident(request, incident_id):
    if request.method == 'POST':
        print(request.POST)
        # Obtener los datos del formulario
        # empleado_id = request.POST.get('empleado_id')
        observaciones = request.POST.get('commentsLine')
        comienzo = request.POST.get('start')
        fin = request.POST.get('end')
        fecha = request.POST.get('dateLine')
        tiempo = request.POST.get('timeLine')
        idLine = request.POST.get('idLine')

        empleado_id=12
        empleado=Empleado.objects.get(pk=empleado_id)

        # Si idLine es '-', crea una nueva línea
        if idLine == '-':
            # Crear una nueva instancia de Line
            line = Line.objects.create(
                empleado=empleado,
                observaciones=observaciones,
                comienzo=comienzo,
                fin=fin,
                fecha=fecha,
                tiempo=tiempo
            )
            # Obtener la incidencia asociada
            incident = Incidencia.objects.get(id=incident_id)
            # Agregar la línea a la incidencia
            incident.lines.add(line)
        else:
            # Si idLine no es '-', edite la línea existente
            line = Line.objects.get(pk=idLine)
            # Actualizar los campos
            line.observaciones = observaciones
            line.comienzo = comienzo
            line.fin = fin
            line.fecha = fecha
            line.tiempo = tiempo
            line.save()

        return redirect('detailsIncident', incident_id=incident_id)

def detailsLine(request, line_id):
    line = Line.objects.get(pk=line_id)
    
    line_data = {
        'id': line.id,
        'observacion': line.observaciones,  
        'tiempo':line.tiempo,
        'fecha':line.fecha,
        'comienzo':line.comienzo,
        'fin':line.fin
    }
    return JsonResponse(line_data)


def updateFilterIncident(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        # Obtener los filtros de la solicitud POST
        date_filter = data.get('date')
        employee_filter = data.get('employee')
        priority_filter = data.get('priority')
        client_filter = data.get('client')
        state_filter = data.get('state')
        category_filter = data.get('category')

        # Obtener todas las incidencias
        incidents = Incidencia.objects.all()

        # Aplicar los filtros
        if employee_filter:
            incidents = incidents.filter(empleado_id=employee_filter)
        if priority_filter:
            incidents = incidents.filter(prioridad=priority_filter)
        if client_filter:
            incidents = incidents.filter(cliente_id=client_filter)
        if state_filter:
            incidents = incidents.filter(estado=state_filter)
        if category_filter:
            incidents = incidents.filter(categoria=category_filter)

        # Aplicar filtro de fecha
        if date_filter:
            if date_filter == 'asc':
                incidents = incidents.order_by('fecha_inicio')
            elif date_filter == 'desc':
                incidents = incidents.order_by('-fecha_inicio')

        # Preparar la respuesta
        data = [{
            'id': incident.id,
            'description': incident.descripcion,
            'comments': incident.observaciones,
            'employee_asigned': incident.empleado.user.username if incident.empleado else None,
            'client': {
                'username': incident.cliente.user.username if incident.cliente else None,
            } if incident.cliente else None,
            'date': incident.fecha_inicio.strftime('%d/%m/%Y') if incident.fecha_inicio else None,
            'priority': incident.get_prioridad_display(),
            'state': incident.get_estado_display(),
            'category': incident.get_categoria_display(),
        } for incident in incidents]
        
        return JsonResponse(data, safe=False)
    else:
        response_data = {'error': 'Se esperaba una solicitud POST'}
        return JsonResponse(response_data, status=400)

@csrf_exempt
def updateFilterEmployes(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        option = data.get('option')
        search = data.get('search')

    employees = Empleado.objects.all()
    
    if option == 'first_name':
        employees = employees.filter(user__first_name__icontains=search)
    elif option == 'last_name':
        employees = employees.filter(user__last_name__icontains=search)
    elif option == 'dni':
        employees = employees.filter(dni__icontains=search)
    elif option == 'telefono':
        employees = employees.filter(telefono__icontains=search)
    elif option == 'departamento':
        employees = employees.filter(departamento__icontains=search)

    results = []
    for employee in employees:
        results.append({
            'id': employee.id,
            'user': {
                'first_name': employee.user.first_name,
                'last_name': employee.user.last_name,
            },
            'dni': employee.dni,
            'telefono': employee.telefono,
            'departamento': employee.departamento,
        })
    
    return JsonResponse(results, safe=False)

@csrf_exempt
def updateFilterClients(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        option = data.get('option')
        search = data.get('search')

    clients = Cliente.objects.all()
    
    if option == 'first_name':
        clients = clients.filter(user__first_name__icontains=search)
    elif option == 'last_name':
        clients = clients.filter(user__last_name__icontains=search)
    elif option == 'dni':
        clients = clients.filter(dni__icontains=search)
    elif option == 'telefono1':
        clients = clients.filter(telefono1__icontains=search)
    elif option == 'telefono2':
        clients = clients.filter(telefono2__icontains=search)
    elif option == 'empresa':
        clients = clients.filter(empresa__nombre__icontains=search)

    results = []
    for client in clients:
        results.append({
            'id': client.id,
            'user': {
                'first_name': client.user.first_name,
                'last_name': client.user.last_name,
            },
            'dni': client.dni,
            'telefono1': client.telefono1,
            'telefono2': client.telefono2,
            'empresa': client.empresa.nombre,
        })
    
    return JsonResponse(results, safe=False)


@csrf_exempt
def updateFilterEnterprises(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        option = data.get('option')
        search = data.get('search')

    enterprises = Empresa.objects.all()
    
    if option == 'nombre':
        enterprises = enterprises.filter(nombre__icontains=search)
    elif option == 'cif_nif':
        enterprises = enterprises.filter(cif_nif__icontains=search)
    elif option == 'direccion':
        enterprises = enterprises.filter(direccion__icontains=search)
    elif option == 'email':
        enterprises = enterprises.filter(email__icontains=search)
    elif option == 'telefono1':
        enterprises = enterprises.filter(telefono1__icontains=search)
    elif option == 'telefono2':
        enterprises = enterprises.filter(telefono2__icontains=search)

    results = []
    for enterprise in enterprises:
        results.append({
            'id': enterprise.id,
            'nombre': enterprise.nombre,
            'cif': enterprise.cif_nif,
            'direccion': enterprise.direccion,
            'email': enterprise.email,
            'telefono1': enterprise.telefono1,
            'telefono2': enterprise.telefono2,
        })
    
    return JsonResponse(results, safe=False)