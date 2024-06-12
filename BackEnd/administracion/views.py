from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render,redirect
from .models import Empleado, Cliente
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
import json

# Create your views here.
def login(request):
    return render(request, 'login/login.html')

@csrf_exempt
def getEmployeesJSON(request):
    employees = Empleado.objects.all()

    response_data = [{
        'id': employee.user.id,
        'nombre': employee.user.username
    } for employee in employees]

    # Devolver los chats en JSON
    return JsonResponse(response_data, safe=False)