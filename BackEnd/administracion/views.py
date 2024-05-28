from django.shortcuts import render,redirect
from .models import Empleado,Cliente,Empresa
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
            

def enterprisesView(request):
    enterprises= Empresa.objects.all()
    return render(request, 'administracion/enterprisesView.html', {'enterprises': enterprises})

# VISTA DETALLE DEL EMPELADO SELECCIONADO
def detailsEnterprise(request,enterprise_id=None):
    #Si hay id, es la vista de editar/detalle
    if enterprise_id :
        enterprise= Empresa.objects.get(pk=enterprise_id)
        print(enterprise.nombre)
        return render(request, 'administracion/detailsEnterprise.html', {'enterprise': enterprise})
    #Si no hay es la vista de crear uno nuevo
    else:
        return render(request, 'administracion/detailsEnterprise.html')


@csrf_exempt
# FUNCIÓN PARA GUARDAR EL EMPLEADO EDITADO
def saveEnterprise(request):
    if request.method == 'POST':
         # Obtener los datos del empleado
        data = json.loads(request.body) 
        enterprise_id = data.get('id')
        nombre = data.get('nombre')
        cif_nif = data.get('cif_nif')
        direccion = data.get('direccion')
        email = data.get('email')
        telefono1 = data.get('telefono1')
        telefono2 = data.get('telefono2')
        accion = data.get('action')
        
        if accion == "edit":
            # Buscar el empleado que vamos a editar
            enterprise_id = int(enterprise_id)
            enterprise = Empresa.objects.get(pk=enterprise_id)

            # Actualizar los campos del empleado
            enterprise.nombre = nombre
            enterprise.cif_nif = cif_nif
            enterprise.direccion = direccion
            enterprise.email = email
            enterprise.telefono1 = telefono1
            enterprise.telefono2 = telefono2

            enterprise.save() 

            response_data = {'success': True, 'message': 'Empresa guardada exitosamente'}
            return JsonResponse(response_data)
        else:
            # Crear una nueva empresa
            new_enterprise = Empresa.objects.create(
                nombre = nombre,
                cif_nif = cif_nif,
                direccion = direccion,
                email = email,
                telefono1 = telefono1, 
                telefono2 = telefono2,
            )

            # Devolver una respuesta JSON indicando el éxito de la operación
            response_data = {'success': True, 'message': 'Empresa creada exitosamente'}
            return JsonResponse(response_data)

def deleteEnterprise(request,enterprise_id):
    enterprise = Empresa.objects.get(pk=enterprise_id)
    enterprise.delete()
    return redirect('enterprisesView')
            


def clientsView(request):
    clients= Cliente.objects.all()
    return render(request, 'administracion/clientsView.html', {'clients': clients})


def detailsClient(request,client_id=None):
    #Si hay id, es la vista de editar/detalle
    if client_id :
        client= Cliente.objects.get(pk=client_id)
        return render(request, 'administracion/detailsClient.html', {'client': client})
    #Si no hay es la vista de crear uno nuevo
    else:
        return render(request, 'administracion/detailsClient.html')

@csrf_exempt
def saveClient(request):
    if request.method == 'POST':
         # Obtener los datos del empleado
        data = json.loads(request.body) 
        client_id = data.get('id')
        nombre = data.get('nombre')
        apellidos = data.get('apellidos')
        dni = data.get('dni')
        telefono1 = data.get('telefono1')
        telefono2 = data.get('telefono2')
        empresa_id = data.get('empresa')
        accion = data.get('action')
        
        empresa_id = int(empresa_id)
        empresa=Empresa.objects.get(pk=empresa_id)
        print("*******************")
        print(empresa_id) 
        if accion == "edit":
            client_id = int(client_id)
            client = Cliente.objects.get(pk=client_id)
            print(client.id)
            # Actualizar los campos del empleado
            client.user.first_name = nombre
            client.user.last_name = apellidos
            client.dni = dni
            client.telefono1 = telefono1
            client.telefono2 = telefono2
            client.empresa = empresa
            client.save() 
            client.user.save()

            response_data = {'success': True, 'message': 'Cliente guardada exitosamente'}
            return JsonResponse(response_data)
        else:
            # Crear un nuevo usuario
            new_user = User.objects.create(
                username=nombre,
                first_name=nombre,
                last_name=apellidos,
            )

            new_client = Cliente.objects.create(
                user=new_user,
                dni = dni,
                telefono1 = telefono1,
                telefono2 = telefono2,
                empresa = empresa,
            )
            
            print(new_user)
            # Devolver una respuesta JSON indicando el éxito de la operación
            response_data = {'success': True, 'message': 'Cliente creado exitosamente'}
            return JsonResponse(response_data)

def deleteClient(request,client_id):
    client = Cliente.objects.get(pk=client_id)
    client.delete()
    return redirect('clientsView')
  