from django.urls import path
from . import views

urlpatterns = [
    # Add more URL patterns as needed
    path('getEmployeesJSON/',views.getEmployeesJSON,name='getEmployeesJSON'),
    path('registerJSON/',views.registerJSON,name='registerJSON'),
]