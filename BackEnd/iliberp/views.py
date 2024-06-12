from django.shortcuts import render
from django.contrib.auth import authenticate, login, get_user_model, logout
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from administracion.models import Cliente,Empleado
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.contrib import messages

def inicioView(request):
    return render(request, 'global/inicioSesion.html', {'departments': Empleado.DEPARTAMENTOS})

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
            'username': user.username
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
    
def loginDjango(request):
    if request.method == 'POST':
        # Obtenemos los datos del login
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('chatView')
        else:
            messages.error(request, 'Usuario o contraseña incorrectos')
            return render(request,"global/inicioSesion.html",{'departments': Empleado.DEPARTAMENTOS})
    else:
        return render(request, "global/inicioSesion.html")
    
def registerDjango(request):
    if request.method == 'POST':
        # Obtiene los datos del formulario
        username = request.POST.get('username')
        password = request.POST.get('password')
        email = request.POST.get('email')
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        dni = request.POST.get('dni')
        telefono = request.POST.get('telefono')
        departamento = request.POST.get('departamento')
        
        # Verifica si el nombre de usuario ya está en uso
        if User.objects.filter(username=username).exists():
            messages.error(request, 'Ya existe ese username')
            return render(request, "global/inicioSesion.html", {'departments': Empleado.DEPARTAMENTOS})
        
        # Crea un nuevo usuario
        user = User.objects.create_user(username=username, password=password, email=email, first_name=first_name, last_name=last_name)

        # Guarda los datos adicionales del cliente
        empleado = Empleado(user=user, dni=dni, telefono=telefono,departamento=departamento)
        empleado.save()
        
        messages.success(request, 'Usuario registrado exitosamente, Inicie Sesión')
        return render(request, "global/inicioSesion.html", {'departments': Empleado.DEPARTAMENTOS})
    else:
        return render(request, "global/inicioSesion.html")