
from django.contrib import admin
from django.urls import path,include
from administracion import views

urlpatterns = [
    path('employees/', views.employeesView, name='employeesView'),
]
