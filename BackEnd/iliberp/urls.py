
from django.contrib import admin
from django.urls import path,include
from iliberp import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('loginApi/',views.loginApi,name='loginApi'),
    path('registerApi/',views.registerApi,name='registerApi'),
    path('login/',views.loginDjango,name='loginDjango'),
    path('register/',views.registerDjango,name='registerDjango'),
    path('',views.inicioView,name='inicioView'),
    path('', include("administracion.urls")),
    path('', include("fichaje.urls")),
    path('', include("incidencias.urls")),
    path('', include("inventario.urls")),
    path('', include("mensajeria.urls")),
    path('', include("trello.urls")),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

