from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from .models import Empleado, Cliente
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
import json

# Create your views here.
@csrf_exempt
def registerJSON(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('user')
        password = data.get('password')
        full_name = data.get('full_name')
        phone = data.get('phone')
        email = data.get('email')

        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'el usuario ya se encuentra registrado'}, status=400)
            
        if User.objects.filter(email=email).exists():
            return JsonResponse({'error': 'el email ya ha sido registrado'}, status=400)


        user = User.objects.create(
            username = username,
            password = make_password(password),
            email=email,
            first_name=full_name.split()[0] if full_name else '',
            last_name=' '.join(full_name.split()[1:]) if full_name else ''
        )
        
        cliente = Cliente.objects.create(
            user = user,
            telefono1 = phone,
        )
        
        return JsonResponse({'success': 'User created successfully'}, status=201)
        
    else:
        # Si la solicitud no es GET, devolver un error
        response_data = {'error': 'Se esperaba una solicitud GET'}
        return JsonResponse(response_data, status=400)

@csrf_exempt
def getEmployeesJSON(request):
    employees = Empleado.objects.all()

    response_data = [{
        'id': employee.user.id,
        'nombre': employee.user.username
    } for employee in employees]

    # Devolver los chats en JSON
    return JsonResponse(response_data, safe=False)