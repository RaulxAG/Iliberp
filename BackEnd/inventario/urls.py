from django.urls import path
from . import views

urlpatterns = [
    # Add more URL patterns as needed
    path("getProductsJSON/", views.getProductsJSON),
    path("getSingleProductJSON/", views.getSingleProductJSON),
    path("getFeaturedProductsJSON/", views.getFeaturedProductsJSON),
    path("getCategorizedProductsJSON/", views.getCategorizedProductsJSON),

    path("getOrdersJSON/", views.getOrdersJSON),
    path("makeOrderJSON/", views.makeOrderJSON),
]