from django.shortcuts import render,redirect
from .models import Empleado

def employeesView(request):
    employees= Empleado.objects.all()
    for employee in employees:
        print(employee.user.username) 
    return render(request, 'administracion/employeesView.html', {'employees': employees})
