from django.urls import path
from . import views

urlpatterns = [
    # Add more URL patterns as needed

    # ------------------- URL's Inventario BackEnd -------------------
    path('inventario/', views.inventario, name="inventario"),                                           # URL Página principal de gestión del inventario
    path('articulos/', views.articulos, name="articulos"),                                              # URL Página de gestión de articulos de la tienda
    path('nuevoArticulo/', views.nuevoArticulo, name="nuevoArticulo"),                                  # URL Para añadir un Articulo de la tienda
    path('guardarArticulo/', views.guardarArticulo, name="guardarArticulo"),                            # URL Para guardar un nuevo un Articulo de la tienda
    path('detalleArticulo-<int:product_id>/', views.detalleArticulo, name="detalleArticulo"),           # URL Página de gestión de articulos de la tienda
    path('eliminarArticulo-<int:product_id>/', views.eliminarArticulo, name="eliminarArticulo"),        # URL Para eliminar un Articulo de la tienda
    path('pedidos/', views.pedidos, name="pedidos"),                                                    # URL Página de gestión de pedidos de la tienda

    path("getProductsJSON/", views.getProductsJSON),
    path("getSingleProductJSON/", views.getSingleProductJSON),
    path("getFeaturedProductsJSON/", views.getFeaturedProductsJSON),
    path("getCategorizedProductsJSON/", views.getCategorizedProductsJSON),

    path("getOrdersJSON/", views.getOrdersJSON),
    path("getSingleOrderJSON/", views.getSingleOrderJSON),
    path("makeOrderJSON/", views.makeOrderJSON),
    path("cancelOrderJSON/", views.cancelOrderJSON),
    path("addAddressJSON/", views.addAddressJSON),
]