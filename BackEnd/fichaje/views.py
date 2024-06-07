from django.shortcuts import render
from django.contrib.auth.models import User
from django.utils import timezone
from .models import Registro
from django.http import JsonResponse

# Create your views here.
def inicio(request):

    last_register = Registro.objects.filter(empleado__id=1).latest('inicio') if Registro.objects.filter(empleado__id=1).exists() else None

    return render(request, 'fichaje/inicio.html', {'last_register': last_register})

def iniciarJornada(request):
    if request.method == 'POST':

        employee_id = request.POST.get('employee_id')

        employee = User.objects.get(pk=employee_id)

        new_registro = Registro.objects.create(
            empleado=employee,
            fecha=timezone.now().date(),
            inicio=timezone.now(),
        )

        new_registro.save()

        registro = {
            'user': {
                'id': new_registro.empleado.id, 
                'username': new_registro.empleado.username,
            },
            'fecha': new_registro.fecha,
            'inicio': new_registro.inicio,
        }
   
        return JsonResponse(registro, safe=False)
    
    return JsonResponse('Error. Se esperaba una solicitud POST', safe=False)

def finalizarJornada(request):
    if request.method == 'POST':
        employee_id = request.POST.get('employee_id')
        employee = User.objects.get(pk=employee_id)
        try:
            # Get the most recent registro without a fin time
            registro = Registro.objects.filter(empleado=employee, fin__isnull=True).latest('inicio')
            registro.fin = timezone.now()
            registro.save()

            response = {
                'user': {
                    'id': registro.empleado.id,
                    'username': registro.empleado.username,
                },
                'fecha': registro.fecha,
                'inicio': registro.inicio,
                'fin': registro.fin,
            }

            return JsonResponse(response, safe=False)
        except Registro.DoesNotExist:
            return JsonResponse('Error. No hay un registro de jornada en curso.', safe=False)

    return JsonResponse('Error. Se esperaba una solicitud POST', safe=False)

def jornadas(request, id_employee=None):

    if id_employee:
        registers = Registro.objects.filter(empleado__id=id_employee).order_by('inicio').reverse()
    else:
        registers = Registro.objects.all().order_by('inicio').reverse()

    return render(request, 'fichaje/registros.html', {'registers': registers})