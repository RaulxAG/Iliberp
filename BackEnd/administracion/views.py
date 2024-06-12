from django.shortcuts import render,redirect
from .models import Empleado,Cliente,Empresa
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from django.contrib.auth.models import User 
from django.core.exceptions import ObjectDoesNotExist

# VISTA PRINCIPAL DE LOS EMPLEADOS, TABLA CON SUS DATOS
def employeesView(request):
    employees= Empleado.objects.all()
    return render(request, 'administracion/employeesView.html', {'employees': employees})

# VISTA DETALLE DEL EMPELADO SELECCIONADO
def detailsEmployee(request,employee_id=None):
    departments = Empleado.DEPARTAMENTOS
    #Si hay id, es la vista de editar/detalle
    if employee_id :
        employee= Empleado.objects.get(pk=employee_id)
        return render(request, 'administracion/detailsEmployee.html', {'employee': employee,'departments': departments})
    #Si no hay es la vista de crear uno nuevo
    else:
        return render(request, 'administracion/detailsEmployee.html', {'departments': departments})


# FUNCIÓN PARA GUARDAR EL EMPLEADO EDITADO
def saveEmployee(request):
    if request.method == 'POST':
         # Obtener los datos del empleado
        employee_id = request.POST.get('id')
        nombre = request.POST.get('nombre')
        apellidos = request.POST.get('apellidos')
        dni = request.POST.get('dni')
        correo = request.POST.get('email')
        telefono = request.POST.get('telefono')
        departamento = request.POST.get('departamento')
        accion = request.POST.get('action')
        foto_perfil = request.FILES.get('foto_perfil')
        print(foto_perfil)
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
            if foto_perfil:
                employee.foto_perfil = foto_perfil

            employee.save() 
            employee.user.save()
            # Devolver una respuesta JSON indicando el éxito de la operación
            response_data = {'success': True, 'message': 'Empleado guardado exitosamente'}
            return JsonResponse(response_data)
        else:
            try:
                # Verificar si ya existe un usuario con el mismo correo electrónico
                User.objects.get(username=correo)
                # Si el usuario ya existe, devolver un mensaje de error
                error_message = "Ya existe un usuario con el mismo correo electrónico."
                response_data = {'success': False, 'message': error_message}
                return JsonResponse(response_data, status=400)
            except ObjectDoesNotExist:
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
                    departamento=departamento,
                    foto_perfil=foto_perfil
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
    enterprises = Empresa.objects.all()
    #Si hay id, es la vista de editar/detalle
    if client_id :
        client= Cliente.objects.get(pk=client_id)
        return render(request, 'administracion/detailsClient.html', {'client': client,'enterprises': enterprises})
    #Si no hay es la vista de crear uno nuevo
    else:
        return render(request, 'administracion/detailsClient.html', {'enterprises': enterprises})


def saveClient(request):
    if request.method == 'POST':
         # Obtener los datos del empleado
        client_id = request.POST.get('id')
        nombre = request.POST.get('nombre')
        apellidos = request.POST.get('apellidos')
        dni = request.POST.get('dni')
        telefono2 = request.POST.get('telefono2')
        telefono1 = request.POST.get('telefono1')
        empresa_id = request.POST.get('empresa')
        accion = request.POST.get('action')
        foto_perfil = request.FILES.get('foto_perfil')
        print(foto_perfil)
        empresa_id = int(empresa_id)
        empresa=Empresa.objects.get(pk=empresa_id)
        
        if accion == "edit":
            client_id = int(client_id)
            client = Cliente.objects.get(pk=client_id)
            # Actualizar los campos del cliente
            client.user.first_name = nombre
            client.user.last_name = apellidos
            client.dni = dni
            client.telefono1 = telefono1
            client.telefono2 = telefono2
            client.empresa = empresa
            if foto_perfil:
                client.foto_perfil = foto_perfil

            client.save() 
            client.user.save()

            response_data = {'success': True, 'message': 'Cliente guardado exitosamente'}
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
                foto_perfil = foto_perfil
            )
            
            # Devolver una respuesta JSON indicando el éxito de la operación
            response_data = {'success': True, 'message': 'Cliente creado exitosamente'}
            return JsonResponse(response_data)

def deleteClient(request,client_id):
    client = Cliente.objects.get(pk=client_id)
    client.delete()
    return redirect('clientsView')
  