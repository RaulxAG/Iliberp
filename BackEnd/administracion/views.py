from django.shortcuts import render,redirect

def employeesView(request):
    return render(request, 'administracion/employeesView.html')
