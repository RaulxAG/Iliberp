from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from .models import Empleado
from django.http import JsonResponse
import json

# Create your views here.
@csrf_exempt
def getEmployeesJSON(request):
    employees = Empleado.objects.all()

    response_data = [{
        'id': employee.user.id,
        'nombre': employee.user.username
    } for employee in employees]

    # Devolver los chats en JSON
    return JsonResponse(response_data, safe=False)