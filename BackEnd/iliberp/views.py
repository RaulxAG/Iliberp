from django.shortcuts import render

def inicioView(request):
    return render(request, 'global/inicioSesion.html')