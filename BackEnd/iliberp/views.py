from django.shortcuts import render
from django.contrib.auth import authenticate, login, get_user_model, logout
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from administracion.models import Cliente
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse

def inicioView(request):
    return render(request, 'global/inicioSesion.html')

@csrf_exempt
def loginApi(request):
    #Obtenemos los datos del login
    username = request.POST.get('username')
    password = request.POST.get('password')

    user = authenticate(request,username = username, password = password)

    if user is not None:
        # Devolver el objeto usuario y su token
        login(request, user)
        token, created = Token.objects.get_or_create(user=user)

        return JsonResponse({
            'token': token.key,
            'user_id': user.id,
            'username': user.username,
        })
    else:
        return JsonResponse({'error': 'Usuario incorrecto'}, status=400)

@csrf_exempt
def registerApi(request):
    if request.method == 'POST':
        # Obtiene los datos del formulario
        username = request.POST.get('username')
        password = request.POST.get('password')
        email = request.POST.get('email')
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        dni = request.POST.get('dni')
        telefono1 = request.POST.get('telefono1')

        # Verifica si el nombre de usuario ya está en uso
        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Ya existe ese username'}, status=400)

        # Crea un nuevo usuario
        user = User.objects.create_user(username=username, password=password, email=email, first_name=first_name, last_name=last_name)

        # Guarda los datos adicionales del cliente
        cliente = Cliente(user=user, dni=dni, telefono1=telefono1)
        cliente.save()

        # Devolver la respuesta con el token y otros detalles del usuario
        return JsonResponse({
            'message': 'Usuario registrado exitosamente, Inicie Sesión',
        }, status=201)
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)