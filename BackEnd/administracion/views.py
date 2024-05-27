from django.shortcuts import render,redirect
from .models import Empleado
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from django.contrib.auth.models import User 

# VISTA PRINCIPAL DE LOS EMPLEADOS, TABLA CON SUS DATOS
def employeesView(request):
    employees= Empleado.objects.all()
    departments = Empleado.DEPARTAMENTOS
    print(departments) 
    return render(request, 'administracion/employeesView.html', {'employees': employees})

# VISTA DETALLE DEL EMPELADO SELECCIONADO
def detailsEmployee(request,employee_id=None):
    #Si hay id, es la vista de editar/detalle
    if employee_id :
        employee= Empleado.objects.get(pk=employee_id)
        return render(request, 'administracion/detailsEmployee.html', {'employee': employee})
    #Si no hay es la vista de crear uno nuevo
    else:
        return render(request, 'administracion/detailsEmployee.html')

@csrf_exempt
# FUNCIÓN PARA GUARDAR EL EMPLEADO EDITADO
def saveEmployee(request):
    if request.method == 'POST':
         # Obtener los datos del empleado
        data = json.loads(request.body) 
        employee_id = data.get('id')
        nombre = data.get('nombre')
        apellidos = data.get('apellidos')
        dni = data.get('dni')
        correo = data.get('email')
        telefono = data.get('telefono')
        departamento = data.get('departamento')
        accion = data.get('action')
        
        print(apellidos)
        if accion == "edit":
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
            employee.user.save()

            # Devolver una respuesta JSON indicando el éxito de la operación
            response_data = {'success': True, 'message': 'Empleado guardado exitosamente'}
            return JsonResponse(response_data)
        else:
            
            # Crear un nuevo usuario
            new_user = User.objects.create(
                username=correo,
                first_name=nombre,
                last_name=apellidos,
                email=correo
            )
 
            # Crear un nuevo empleado con el usuario recién creado
            new_employee = Empleado.objects.create(
                user=new_user,
                dni=dni,
                telefono=telefono,
                departamento=departamento
            )

            # Devolver una respuesta JSON indicando el éxito de la operación
            response_data = {'success': True, 'message': 'Empleado creado exitosamente'}
            return JsonResponse(response_data)

#FUNCIÓN ELIMINAR UN EMPLEADO
def deleteEmployee(request,employee_id):
    employee = Empleado.objects.get(pk=employee_id)
    employee.delete()
    return redirect('employeesView')
            
