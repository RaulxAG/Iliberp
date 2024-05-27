
from django.contrib import admin
from django.urls import path,include
from administracion import views

urlpatterns = [
    # -----------------------------------URL EMPLEADOS---------------------------------------
    path('employees/', views.employeesView, name='employeesView'),                                          #Url vista general de los empleados
    path('detailsEmployee-<int:employee_id>/', views.detailsEmployee, name='detailsEmployee'),              #Url vista detalles empleados y editarlos
    path('newEmployee/', views.detailsEmployee, name='detailsEmployee'),                                    #Url nuevo empleado
    path('saveEmployee/', views.saveEmployee, name='saveEmployee'),                                         #Url guardar empleado nuevo o editado
    path('deleteEmployee-<int:employee_id>/', views.deleteEmployee, name='deleteEmployee'),                 #Url eliminar empleado

    # -----------------------------------URL EMPRESAS---------------------------------------
    path('enterprises/', views.enterprisesView, name='enterprisesView'),                                    #Url vista general de las empresas
    path('detailsEnterprise-<int:enterprise_id>/', views.detailsEnterprise, name='detailsEnterprise'),      #Url vista detalles empresa y editarlas
    path('newEnterprise/', views.detailsEnterprise, name='detailsEnterprise'),                              #Url nueva empresa
    path('saveEnterprise/', views.saveEnterprise, name='saveEnterprise'),                                   #Url guardar empleado nuevo o editado
    path('deleteEnterprise-<int:enterprise_id>/', views.deleteEnterprise, name='deleteEnterprise'),                 #Url eliminar empleado
]
