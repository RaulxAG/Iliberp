
from django.contrib import admin
from django.urls import path,include
from administracion import views

urlpatterns = [
    path('employees/', views.employeesView, name='employeesView'),                                          #Url vista general de los empleados
    path('detailsEmployee-<int:employee_id>/', views.detailsEmployee, name='detailsEmployee'),              #Url vista detalles empleados y editarlos
    path('newEmployee/', views.detailsEmployee, name='detailsEmployee'),                                    #Url nuevo empleado
    path('saveEmployee/', views.saveEmployee, name='saveEmployee'),                                         #Url guardar empleado nuevo o editado
    path('deleteEmployee-<int:employee_id>/', views.deleteEmployee, name='deleteEmployee'),                                         #Url guardar empleado nuevo o editado
]
