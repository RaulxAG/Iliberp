from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from .models import Producto, Pedido, Linea
from administracion.models import Cliente
from django.shortcuts import render, redirect
from datetime import datetime, timedelta, time
from django.contrib import messages
from django.utils import timezone
from decimal import Decimal
import requests

def inventario(request):
    return render(request, "inventario/inventario.html")

def articulos(request):
    products = Producto.objects.all()

    return render(request, "inventario/articulos.html", {'products': products})

def nuevoArticulo(request):
    tipos = Producto.TIPO

    return render(request, "inventario/nuevoArticulo.html", {'tipos': tipos})

def guardarArticulo(request):
    if request.method == 'POST':
        product_id = request.POST.get('product_id')
        descripcion = request.POST.get('descripcion')
        #especificaciones
        nombre = request.POST.get('nombre')
        tipo = request.POST.get('tipo')
        precio = request.POST.get('precio')
        precio_descuento = request.POST.get('descuento')
        imagen = request.FILES.get('imagen')
        destacado = request.POST.get('destacado')

        if destacado == "on":
            destacado = True
        elif destacado == "off":
            destacado = False
        
        try:
            # Convertir comas a puntos y luego convertir a Decimal
            if precio:
                precio = Decimal(precio.replace(',', '.'))
            if precio_descuento:
                precio_descuento = Decimal(precio_descuento.replace(',', '.'))
            else:
                precio_descuento = None

            if product_id:
                existingProduct = Producto.objects.get(pk=product_id)

                existingProduct.descripcion = descripcion
                #especificaciones
                existingProduct.nombre = nombre
                existingProduct.tipo = tipo
                existingProduct.precio = precio
                existingProduct.precio_descuento = precio_descuento if precio_descuento else None
                existingProduct.foto = imagen if imagen else None
                existingProduct.destacado = destacado

                existingProduct.save()

                messages.success(request, 'Producto modificado correctamente.')
            else:
                newProduct = Producto.objects.create(
                    descripcion = descripcion,
                    #especificaciones
                    nombre = nombre,
                    tipo = tipo,
                    precio = precio,
                    precio_descuento = precio_descuento if precio_descuento else None,
                    foto = imagen if imagen else None,
                    destacado = destacado,
                )

                messages.success(request, 'Producto añadido correctamente.')
        except Exception as e:
            messages.error(request, 'Error al añadir el producto.' + str(e))

        return redirect("/empleados/articulos")
        

def detalleArticulo(request, product_id=None):
    product = Producto.objects.get(pk=product_id)
    especificaciones = product.especificaciones
    tipos = Producto.TIPO

    return render(request, "inventario/detalleArticulo.html", {'product': product, 'especificaciones': especificaciones, 'tipos': tipos})

def eliminarArticulo(request, product_id=None):
    products = Producto.objects.all()

    try:

        product = Producto.objects.get(pk=product_id)
        product.delete()
        messages.success(request, 'Producto eliminado correctamente.')
    except Exception as e:
        messages.error(request, 'Error al eliminar el producto.')

    return redirect("/empleados/articulos")

def pedidos(request):
    orders = Pedido.objects.all().order_by('fecha').reverse()

    return render(request, "inventario/pedidos.html", {'orders': orders})

def nuevoPedido(request):
    clientes = Cliente.objects.all()
    estados = Pedido.ESTADOS
    articulos = Producto.objects.all()

    return render(request, "inventario/nuevoPedido.html", {'clientes': clientes, 'estados': estados, 'articulos': articulos})

def detallePedido(request, order_id=None):
    order = Pedido.objects.get(pk=order_id)
    lines = Linea.objects.filter(pedido_id=order_id)
    clientes = Cliente.objects.all()
    estados = Pedido.ESTADOS

    return render(request, "inventario/detallePedido.html", {'order': order, 'lines': lines, 'estados': estados, 'clientes': clientes})

def eliminarPedido(request, order_id=None):
    orders = Pedido.objects.all()

    try:
        order = Pedido.objects.get(pk=order_id)
        order.delete()

        messages.success(request, 'Pedido eliminado correctamente.')
    except Exception as e:
        messages.error(request, 'Error al eliminar el Pedido.')

    return redirect("/empleados/pedidos")

def guardarPedido(request):
    if request.method == 'POST':
        order_id = request.POST.get('order_id')
        fecha = request.POST.get('fecha')
        cliente = request.POST.get('cliente')
        direccion = request.POST.get('direccion')
        estado = request.POST.get('estado')
        
        try:
            if cliente:
                cliente = Cliente.objects.get(pk=cliente)

            if order_id:
                existingOrder = Pedido.objects.get(pk=order_id)

                existingOrder.fecha = fecha
                existingOrder.cliente = cliente
                existingOrder.direccion = direccion
                existingOrder.estado = estado

                existingOrder.save()

                messages.success(request, 'Pedido modificado correctamente.')
            else:
                newOrder = Pedido.objects.create(
                    fecha = fecha,
                    cliente = cliente,
                    direccion = direccion,
                    estado = estado
                )

                messages.success(request, 'Pedido añadido correctamente.')
        except Exception as e:
            messages.error(request, 'Error al añadir el producto.' + str(e))

        return redirect("/empleados/pedidos")

def updateFilterOrder(request):
    if request.method == 'POST':  # Si existe una solicitud POST
        data = json.loads(request.body)  # Decodificar los datos JSON del cuerpo de la solicitud

        # Obtener los filtros de la solicitud
        date_filter = data.get('date')
        state_filter = data.get('state')

        orders = Pedido.objects.all()  # Obtener todas las incidencias

        # Aplicar los filtros de manera lógica
        if state_filter:
            orders = orders.filter(estado=int(state_filter))

        # Ordenar por fecha si se especifica el filtro
        if date_filter:
            if date_filter == 'recientes':
                orders = orders.order_by('-fecha')
            elif date_filter == 'antiguos':
                orders = orders.order_by('fecha')

        # Formatear la respuesta con las tareas filtradas y ordenadas
        data = [{
            'id': order.id,
            'fecha': order.fecha.strftime('%Y-%m-%d'),  # Asegúrate de formatear la fecha como una cadena
            'direccion': order.direccion,
            'cliente': {'nombre': order.cliente.user.username},
            'estado': order.get_estado_display(),
        } for order in orders]

        return JsonResponse(data, safe=False)  # Devolver aquí la respuesta
    else:
        response_data = {'error': 'Se esperaba una solicitud POST'}
        return JsonResponse(response_data, status=400)

def updateFilterArticle(request):
    if request.method == 'POST':  # Si existe una solicitud POST
        data = json.loads(request.body)  # Decodificar los datos JSON del cuerpo de la solicitud

        # Obtener los filtros de la solicitud
        type_filter = data.get('type')
        featured_filter = data.get('featured')
        price_filter = data.get('price')

        if featured_filter:
            if featured_filter == 'true':
                featured_filter = True
            elif featured_filter == 'false':
                featured_filter = False
    
            featured_filter = bool(featured_filter)  # Convierte el valor a un booleano
        else:
            featured_filter = None

        # Ordenar por precio si se especifica el filtro
        if price_filter:
            if price_filter == 'ascendente':
                articles = Producto.objects.order_by('precio')
            elif price_filter == 'descendente':
                articles = Producto.objects.order_by('-precio')
        else:
            articles = Producto.objects.all()  # Obtener todos los productos

        arrayArticles = []

        for article in articles:
                arrayArticles.append(article)

        # Aplicar los filtros de manera lógica usando una comprensión de lista ( si existe el filtro se aplica )
        filtered_articles = [article for article in arrayArticles if 
            (not type_filter or article.tipo == type_filter) and
            (featured_filter is None or article.destacado == featured_filter)
        ]

        # Formatear la respuesta con los artículos filtrados y ordenados
        data = [{
            'id': article.id,
            'nombre': article.nombre,
            'tipo': article.tipo,
            'destacado': article.destacado,
            'precio': float(article.precio),
        } for article in filtered_articles]

        return JsonResponse(data, safe=False)  # Devolver aquí la respuesta
    else:
        response_data = {'error': 'Se esperaba una solicitud POST'}
        return JsonResponse(response_data, status=400)

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
            "id": product.id,
            "nombre": product.nombre,
            "descripcion": product.descripcion,
            "precio": product.precio,
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
            "precio": product.precio,
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
def addAddressJSON(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        pedido_id = data.get('pedido_id')

        calle = data.get('calle')
        numero = data.get('numero')
        provincia = data.get('provincia')
        localidad = data.get('localidad')
        codigo_postal = data.get('codigo_postal')

        try:
            pedido = Pedido.objects.get(pk=pedido_id)

            pedido.direccion = calle + ", nº" + str(numero) + ", " + str(codigo_postal) + ", " + localidad + ", " + provincia

            pedido.save() 

            return JsonResponse({"message": "Dirección añadida con éxito", "pedido_id": pedido.id, "direccion": pedido.direccion}, status=200)
        except:
            return JsonResponse({"message": "Error al añadir la dirección del pedido", "pedido_id": pedido.id}, status=400)
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
            pedido = Pedido.objects.deleteIncidentJSON(pk=pedido_id)


            return JsonResponse({"message": "Pedido eliminado con éxito", "pedido_id": pedido.id}, status=200)
        except:
            return JsonResponse({"message": "Error al eliminar el pedido", "pedido_id": pedido.id}, status=400)
    else:
        # Si la solicitud no es POST, devolver un error
        response_data = {'error': 'Se esperaba una solicitud POST'}
        return JsonResponse(response_data, status=400)
    

def getProvincias(request):
    url = "http://ovc.catastro.meh.es/OVCServWeb/OVCWcfCallejero/COVCCallejero.svc/json/ObtenerProvincias"
    response = requests.get(url)
    data = response.json()
    # Devolver solo la info de las provincias 
    provincias=data.get('consulta_provincieroResult', {}).get('provinciero', {})
    
    return JsonResponse(provincias)

def getLocalidades(request):
    provincia = request.GET.get('provincia')
    url = f"http://ovc.catastro.meh.es/OVCServWeb/OVCWcfCallejero/COVCCallejero.svc/json/ObtenerMunicipios?Provincia={provincia}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return JsonResponse(data)
    else:
        return JsonResponse({'error': 'No se pudieron obtener las localidades'}, status=response.status_code)