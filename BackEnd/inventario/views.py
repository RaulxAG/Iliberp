from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from .models import Producto

@csrf_exempt
def getProductsJSON(request):
    if request.method == 'GET':
        # Obtener todos los productos de la base de datos
        products = Producto.objects.all()
        
        # Crear un paginador con 6 productos por página
        paginator = Paginator(products, 6)
        
        # Obtener el número de página desde los parámetros de consulta
        page = request.GET.get('page', 1)
        
        try:
            products_page = paginator.page(page)
        except PageNotAnInteger:
            # Si la página no es un número entero, entregar la primera página
            products_page = paginator.page(1)
        except EmptyPage:
            # Si la página está fuera del rango, entregar la última página de resultados
            products_page = paginator.page(paginator.num_pages)
        
        # Crear una lista de diccionarios con los datos de los productos
        data = [{
            "nombre": product.nombre,
            "descripcion": product.descripcion,
            "especificaciones": product.especificaciones,
            "precio_descuento": product.precio_descuento,
            "tipo": product.tipo,
            "destacado": product.destacado,
            "foto": product.foto.url if product.foto else None
        } for product in products_page]
        
        # Retornar los datos paginados como JSON
        return JsonResponse({
            'products': data,
            'page': products_page.number,
            'num_pages': paginator.num_pages,
            'total_products': paginator.count
        }, safe=False)
    else:
        # Si la solicitud no es GET, devolver un error
        response_data = {'error': 'Se esperaba una solicitud GET'}
        return JsonResponse(response_data, status=400)

@csrf_exempt
def getFeaturedProductsJSON(request):
    if request.method == 'GET':
        # Obtener todos los productos de la base de datos
        products = Producto.objects.filter(destacado=True)
        
        # Crear un paginador con 6 productos por página
        paginator = Paginator(products, 6)
        
        # Obtener el número de página desde los parámetros de consulta
        page = request.GET.get('page', 1)
        
        try:
            products_page = paginator.page(page)
        except PageNotAnInteger:
            # Si la página no es un número entero, entregar la primera página
            products_page = paginator.page(1)
        except EmptyPage:
            # Si la página está fuera del rango, entregar la última página de resultados
            products_page = paginator.page(paginator.num_pages)
        
        # Crear una lista de diccionarios con los datos de los productos
        data = [{
            "nombre": product.nombre,
            "descripcion": product.descripcion,
            "especificaciones": product.especificaciones,
            "precio_descuento": product.precio_descuento,
            "tipo": product.tipo,
            "destacado": product.destacado,
            "foto": product.foto.url if product.foto else None
        } for product in products_page]
        
        # Retornar los datos paginados como JSON
        return JsonResponse({
            'products': data,
            'page': products_page.number,
            'num_pages': paginator.num_pages,
            'total_products': paginator.count
        }, safe=False)
    else:
        # Si la solicitud no es GET, devolver un error
        response_data = {'error': 'Se esperaba una solicitud GET'}
        return JsonResponse(response_data, status=400)