from django.urls import path
from . import views

urlpatterns = [
    # Add more URL patterns as needed
    path("getProductsJSON/", views.getProductsJSON),
    path("getFeaturedProductsJSON/", views.getFeaturedProductsJSON),
]