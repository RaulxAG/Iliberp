"""
URL configuration for iliberp project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from iliberp import views

urlpatterns = [
    path('empleados/admin/', admin.site.urls),
    path('empleados/login/',views.loginDjango,name='loginDjango'),
    path('empleados/loginApi/',views.loginApi,name='loginApi'),
    path('empleados/registerApi/',views.registerApi,name='registerApi'),
    path('empleados/register/',views.registerDjango,name='registerDjango'),
    path('empleados/',views.inicioView,name='inicioView'),
    path('empleados/', include("administracion.urls")),
    path('empleados/', include("fichaje.urls")),
    path('empleados/', include("incidencias.urls")),
    path('empleados/', include("inventario.urls")),
    path('empleados/', include("mensajeria.urls")),
    path('empleados/', include("trello.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
