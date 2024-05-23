from django.shortcuts import render,redirect
from .models import Empleado
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
# VISTA PRINCIPAL DE LOS EMPLEADOS, TABLA CON SUS DATOS
def employeesView(request):
    employees= Empleado.objects.all()
    for employee in employees:
        print(employee.user.username) 
    return render(request, 'administracion/employeesView.html', {'employees': employees})

# VISTA DETALLE DEL EMPELADO SELECCIONADO
def detailsEmployee(request,employee_id):
    employee= Empleado.objects.get(pk=employee_id)
    return render(request, 'administracion/detailsEmployee.html', {'employee': employee})

@csrf_exempt
# FUNCIÓN PARA GUARDAR EL EMPLEADO EDITADO
def saveEmployee(request):
    if request.method == 'POST':
        # Obtener los datos del empleado
        data = request.POST or json.loads(request.body)
        employee_id = data.get('id')
        nombre = data.get('nombre')
        apellidos = data.get('apellidos')
        dni = data.get('dni')
        correo = data.get('correo') or data.get('email')
        telefono = data.get('telefono')
        departamento = data.get('departamento')

        # Buscar el empleado que vamos a editar
        employee_id = int(employee_id)
        employee = Empleado.objects.get(pk=employee_id)

        # Actualizar los campos del empleado
        employee.user.first_name = nombre
        employee.user.last_name = apellidos
        employee.dni = dni
        employee.user.email = correo
        employee.telefono = telefono
        employee.departamento = departamento

        employee.save()

        # Devolver una respuesta JSON indicando el éxito de la operación
        response_data = {'success': True, 'message': 'Empleado guardado exitosamente'}
        return JsonResponse(response_data)
