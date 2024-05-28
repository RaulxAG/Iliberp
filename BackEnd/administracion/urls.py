
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
    path('deleteEnterprise-<int:enterprise_id>/', views.deleteEnterprise, name='deleteEnterprise'),         #Url eliminar empleado

     # -----------------------------------URL CLIENTES---------------------------------------
    path('clients/', views.clientsView, name='clientsView'),                                               #Url vista general de los clientes
    path('detailsClient-<int:client_id>/', views.detailsClient, name='detailsClient'),                     #Url vista detalles clientes y editarlos
    path('newClient/', views.detailsClient, name='detailsClient'),                                         #Url nuevo cliente
    path('saveClient/', views.saveClient, name='saveClient'),                                              #Url guardar cliente nuevo o editado
    path('deleteClient-<int:client_id>/', views.deleteClient, name='deleteClient'),                 #Url eliminar empleado
]
