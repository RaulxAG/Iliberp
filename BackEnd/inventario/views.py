from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from .models import Producto, Pedido, Linea
from administracion.models import Cliente
from django.utils import timezone

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
def getSingleProductJSON(request):
    if request.method == 'GET':

        producto_id = request.GET.get("id");

        # Obtener el producto de la base de datos
        product = Producto.objects.get(pk=producto_id)

        data = [{
            "nombre": product.nombre,
            "descripcion": product.descripcion,
            "especificaciones": product.especificaciones,
            "precio_descuento": product.precio_descuento,
            "tipo": product.tipo,
            "destacado": product.destacado,
            "foto": product.foto.url if product.foto else None
        }]

        # Retornar los datos paginados como JSON
        return JsonResponse(data, safe=False)
    else:
        # Si la solicitud no es GET, devolver un error
        response_data = {'error': 'Se esperaba una solicitud GET'}
        return JsonResponse(response_data, status=400)

@csrf_exempt
def getFeaturedProductsJSON(request):
    if request.method == 'GET':
        # Obtener todos los productos destacados de la base de datos
        products = Producto.objects.filter(destacado=True)
        
        # Crear un array de objetos con los datos de los productos
        data = [{
            "nombre": product.nombre,
            "descripcion": product.descripcion,
            "especificaciones": product.especificaciones,
            "precio_descuento": product.precio_descuento,
            "tipo": product.tipo,
            "destacado": product.destacado,
            "foto": product.foto.url if product.foto else None
        } for product in products]
        
        # Retornar los datos paginados como JSON
        return JsonResponse(data, safe=False)
    else:
        # Si la solicitud no es GET, devolver un error
        response_data = {'error': 'Se esperaba una solicitud GET'}
        return JsonResponse(response_data, status=400)
    
@csrf_exempt
def getCategorizedProductsJSON(request):
    if request.method == 'GET':

        category = request.GET.get("category") # String de la categoría, Ej. "Teclados"

        products = Producto.objects.filter(tipo=category) # Obtener todos los productos de la base de datos
        
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
        
        # Crear un array con los datos de los productos
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
def getOrdersJSON(request):
    if request.method == 'GET':

        cliente_id = request.GET.get("cliente")

        # Obtener todos los pedidos de la base de datos
        pedidos = Pedido.objects.filter(cliente=cliente_id)
        
        # Crear un arrray de objetos con los datos de los pedidos
        data = [{
            "cliente": pedido.cliente.id,
            "fecha": pedido.fecha,
            "direccion": pedido.direccion,
            "estado": pedido.estado,
            "subtotal": pedido.subtotal,
            "IVA": pedido.IVA,
            "total": pedido.total,
            "lineas": [{
                "articulo": linea.articulo.nombre if linea.articulo else None,
                "unidades": linea.unidades
            } for linea in pedido.lineas.all()]
        } for pedido in pedidos]
        
        return JsonResponse(data, safe=False)
    else:
        # Si la solicitud no es GET, devolver un error
        response_data = {'error': 'Se esperaba una solicitud GET'}
        return JsonResponse(response_data, status=400)
    
@csrf_exempt
def getSingleOrderJSON(request):
    if request.method == 'GET':

        pedido_id = request.GET.get("pedido");

        # Obtener el pedido de la base de datos
        pedido = Pedido.objects.get(pk=pedido_id)

        data = [{
            "cliente": pedido.cliente.id,
            "fecha": pedido.fecha,
            "direccion": pedido.direccion,
            "estado": pedido.estado,
            "subtotal": pedido.subtotal,
            "IVA": pedido.IVA,
            "total": pedido.total,
            "lineas": [{
                "articulo": linea.articulo.nombre if linea.articulo else None,
                "unidades": linea.unidades
            } for linea in pedido.lineas.all()]
        }]

        # Retornar los datos paginados como JSON
        return JsonResponse(data, safe=False)
    else:
        # Si la solicitud no es GET, devolver un error
        response_data = {'error': 'Se esperaba una solicitud GET'}
        return JsonResponse(response_data, status=400)
    
@csrf_exempt
def makeOrderJSON(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        
        cliente_id = data.get('cliente_id')
        direccion = data.get('direccion')
        lineas_data = data.get('lineas')

        if not cliente_id or not direccion or not lineas_data:
            return JsonResponse({"error": "Faltan datos requeridos (cliente_id, direccion o lineas)"}, status=400)
        
        cliente = Cliente.objects.get(pk=cliente_id)
        
        # Crear el pedido
        pedido = Pedido.objects.create(cliente=cliente, direccion=direccion, estado=0, fecha=timezone.now())
        
        subtotal = 0
        
        # Crear las lineas del pedido
        for linea_data in lineas_data:
            articulo_id = linea_data.get('articulo_id')
            unidades = linea_data.get('unidades')
            
            articulo = Producto.objects.get(pk=articulo_id)
            
            # Crear la linea
            linea = Linea.objects.create(articulo=articulo, unidades=unidades, pedido=pedido)
            
            # Calcular el subtotal
            subtotal += float(articulo.precio) * unidades
        
        # Calcular IVA y total
        IVA = subtotal * 0.21
        total = subtotal + IVA
        
        # Actualizar el pedido con los totales calculados
        pedido.subtotal = subtotal
        pedido.IVA = IVA
        pedido.total = total
        pedido.save()
        
        return JsonResponse({"message": "Pedido creado exitosamente", "pedido_id": pedido.id}, status=201)
    
    else:
        # Si la solicitud no es POST, devolver un error
        response_data = {'error': 'Se esperaba una solicitud POST'}
        return JsonResponse(response_data, status=400)
    
@csrf_exempt
def cancelOrderJSON(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        pedido_id = data.get('pedido_id')

        try:
            pedido = Pedido.objects.delete(pk=pedido_id)

            return JsonResponse({"message": "Pedido eliminado con éxito", "pedido_id": pedido.id}, status=200)
        except:
            return JsonResponse({"message": "Error al eliminar el pedido", "pedido_id": pedido.id}, status=400)
    else:
        # Si la solicitud no es POST, devolver un error
        response_data = {'error': 'Se esperaba una solicitud POST'}
        return JsonResponse(response_data, status=400)