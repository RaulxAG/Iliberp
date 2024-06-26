from django.http import JsonResponse
from django.contrib.auth.models import User
import json
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime
from .models import Mensaje, Chat,UsuarioChat
from django.core.paginator import Paginator,EmptyPage
from django.utils import timezone
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from administracion.models import Empleado, Cliente
from django.templatetags.static import static

@csrf_exempt
def getChatsJSON(request,user_id):
    #Obtener el usuario
    user=User.objects.get(pk=user_id)

    #Obtener todos los chats relacionados con el usuario
    chats_usuario = UsuarioChat.objects.filter(usuario=user).values_list('chat_id', flat=True) 
    # Inicializar un array de objetos para almacenar la información de los chats
    chats_info = []

    for chat_id in set(chats_usuario):
        # Obtener el último mensaje del chat
        mensaje = Mensaje.objects.filter(chat_id=chat_id).order_by('-fecha', '-hora').first()

        participants = UsuarioChat.objects.filter(chat_id=chat_id).exclude(usuario=user)
        
        # Extract IDs and usernames of other participants
        participants_info = [{
            'id': participant.usuario.id,
            'nombre': participant.usuario.username
        } for participant in participants]

       # Obtener la fecha y hora del último mensaje
        if mensaje:
            usuario = mensaje.usuario
            fecha = mensaje.fecha.strftime('%Y-%m-%d')
            hora = mensaje.hora.strftime('%H:%M:%S')
            texto = mensaje.texto

            # Crear un diccionario con la información del chat
            chat_info = {
                'usuarios': participants_info,
                'ultimo_remitente': {
                    'id': usuario.id,
                    'nombre': usuario.username,
                },
                'chat_id': chat_id,
                'texto': texto,
                'fecha': fecha,
                'hora': hora,
            }

            chats_info.append(chat_info)

    # Devolver los chats en JSON
    return JsonResponse({'chats': chats_info})

@csrf_exempt
def getMessagesJSON(request,chat_id):
    #Obtenemos la página que quiere ver
    page = request.GET.get('page')
    user_id = request.GET.get('user')

    user = User.objects.get(pk=user_id)

    if not page:
        page=1
    chat= Chat.objects.get(pk=chat_id)
    messages = Mensaje.objects.filter(chat=chat).order_by('fecha', 'hora')
    messagesJson=[]

    participants = UsuarioChat.objects.filter(chat_id=chat_id).exclude(usuario=user)
        
    # Extract IDs and usernames of other participants
    participants_info = [{
        'id': participant.usuario.id,
        'nombre': participant.usuario.username
    } for participant in participants]
    
    paginator = Paginator(messages, 8)
    total_pages = paginator.num_pages

    if not page or not page.isdigit() or int(page) > total_pages or int(page) < 1:
        page = total_pages
    else:
        page = int(page)

    try:
        # Obtener los mensajes de la página actual
        page_obj = paginator.page(page)
    except EmptyPage:
        # Si la página está fuera de rango, devolver una página vacía
        page_obj = paginator.page(paginator.num_pages)

    for message in page_obj:
        message_info = {
            'mensaje_id': message.id,
            'usuario': message.usuario.id,
            'chat': message.chat.id,
            'texto': message.texto,
            'fichero': message.fichero.url if message.fichero else None,
            'fecha': message.fecha.strftime('%Y-%m-%d'),
            'hora': message.hora.strftime('%H:%M:%S'),
        }
        messagesJson.append(message_info)
    
    # Devolver los mensajes en JSON junto con el número de página actual y el número total de páginas
    pagesJson = {
        'current_page': page_obj.number,
        'total_pages': paginator.num_pages
    }

    # Devolver los mensajes en JSON
    return JsonResponse({'participants': participants_info, 'messages': messagesJson, 'pages': pagesJson})

@csrf_exempt
def setMessageJSON(request):
    if request.method == 'POST':
        user_id = request.POST.get('user_id')
        chat_id = request.POST.get('chat_id')
        texto = request.POST.get('mensaje')
        fichero = request.FILES.get('fichero')

    user=User.objects.get(pk=user_id)
    chat=Chat.objects.get(pk=chat_id)
    fecha = timezone.now().date()
    hora = datetime.now().time()

    new_message = Mensaje.objects.create(
        usuario=user,
        chat=chat,
        texto=texto,
        fichero=fichero if fichero else None,
        fecha=fecha,
        hora=hora
    )

    message = {
        'usuario': new_message.usuario.username,
        'chat': new_message.chat.id,
        'texto': new_message.texto,
        # 'fichero': new_message.fichero if new_message.fichero else None,
        'fecha': new_message.fecha.strftime('%Y-%m-%d'),
        'hora': new_message.hora.strftime('%H:%M:%S'),
    }

    return JsonResponse({'message': message})

@csrf_exempt
def setChatJSON(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user1_id = data['user1']
        user2_id = data['user2']

        user1=User.objects.get(pk=user1_id)
        user2=User.objects.get(pk=user2_id)

        #Filtramos para ver si hay algún chat entre los dos
        existing_chats = Chat.objects.filter(
            usuariochat__usuario = user1
        ).filter(
            usuariochat__usuario = user2
        )

        #Si hay, llamamos a la funcion getMessages
        if existing_chats.exists(): 
            chat = existing_chats.first()  # Usamos .first() para obtener el primer chat
            return getMessagesJSON(request, chat.id)
        else:
            #Si no hay, creamos el chat y asociamos a los usuarios al chat
            new_chat = Chat.objects.create()
            # Asociar ambos usuarios al chat
            UsuarioChat.objects.create(usuario=user1, chat=new_chat)
            UsuarioChat.objects.create(usuario=user2, chat=new_chat)

            Mensaje.objects.create(
                usuario=user2,
                chat=new_chat,
                texto="Hola, en qué puedo ayudarle?",
                fecha=timezone.now().date(),
                hora=timezone.now().time()
            )

            response_data = {
                'chat_id': new_chat.id,
                'user1': {
                    'id':user1.id,
                    'username':user1.username,
                },
                'user2_id': {
                    'id':user2.id,
                    'username':user2.username,
                },
                'messages': []
            }
            return JsonResponse(response_data, status=201)

@login_required
def chatView(request):
    # Obtener usuario logueado
    user = request.user
    userLog = User.objects.get(pk=user.id) 

    employees = Empleado.objects.all()
    chats_usuario = UsuarioChat.objects.filter(usuario=userLog).values_list('chat_id', flat=True)

    chats_user = []

    for chat_id in set(chats_usuario):
        # Obtener el último mensaje del chat
        mensaje = Mensaje.objects.filter(chat_id=chat_id).order_by('-fecha', '-hora').first()

        # Obtener la fecha y hora del último mensaje
        if mensaje:
            if mensaje.fecha == timezone.now().date():
                fecha_hora = mensaje.hora.strftime('%H:%M')
            else:
                fecha_hora = mensaje.fecha.strftime('%Y-%m-%d')
            texto = mensaje.texto

            # Determinar quién escribió el último mensaje
            remitente = 'tú' if mensaje.usuario == userLog else mensaje.usuario.username

            # Obtener el receptor del chat
            receptor = UsuarioChat.objects.filter(chat_id=chat_id).exclude(usuario=userLog).first()
            
            if receptor:  # Asegurarse de que receptor no sea None
                receptor_usuario = receptor.usuario

                # Crear un diccionario con la información del chat
                chat_info = {
                    'chat_id': chat_id,
                    'receptor_nombre': receptor_usuario.username,
                    'texto': texto,
                    'fecha_hora': fecha_hora,
                    'remitente': remitente,
                }

                chats_user.append(chat_info)
            else:
                print(f"Warning: No se encontró receptor para el chat_id {chat_id}")

    # Ordenar los chats por la fecha y hora del último mensaje en orden descendente
    chats_user.sort(key=lambda x: x['fecha_hora'], reverse=True)

    return render(request, 'mensajeria/mensajeria.html', {'employees': employees, 'chats_user': chats_user, 'userLog': userLog})

def allClients(request):
    clients = Cliente.objects.all()
    clients_data = [
        {
            'id': client.user.id, 
            'nombre': client.user.first_name
        } 
        for client in clients
    ]  
    return JsonResponse(clients_data, safe=False)

def allEmployees(request):
    employees = Empleado.objects.all()
    employees_data = [
        {
            'id': employee.user.id, 
            'nombre': employee.user.first_name
        } 
        for employee in employees
    ] 
    return JsonResponse(employees_data, safe=False)

def getChats(request,user_id):
    #Imagen por defecto de mensajeria
    static_url = static('assets/img/usuarioLogo.png')

    # Obtener el usuario logueado
    user = User.objects.get(pk=user_id)

    # Obtener todos los chats relacionados con el usuario
    chats_usuario = UsuarioChat.objects.filter(usuario=user).values_list('chat_id', flat=True)

    # Inicializar un array de objetos para almacenar la información de los chats
    chats_info = []

    for chat_id in set(chats_usuario):
        # Obtener el último mensaje del chat
        mensaje = Mensaje.objects.filter(chat_id=chat_id).order_by('-fecha', '-hora').first()

        # Verificar si hay un mensaje en este chat
        if mensaje:
            # Obtener la fecha o hora del mensaje
            if mensaje.fecha == timezone.now().date():
                fecha_hora = mensaje.hora.strftime('%H:%M')
            else:
                fecha_hora = mensaje.fecha.strftime('%Y-%m-%d')

            texto = mensaje.texto

            # Determinar quién escribió el último mensaje
            remitente = 'tú' if mensaje.usuario == user else mensaje.usuario.username

            # Agregar la información del último mensaje al diccionario
            chat_info = {
                'texto': texto,
                'fecha_hora': fecha_hora,
                'remitente': remitente,
                'chat_id': chat_id,
                'static_url':static_url
            }
            chats_info.append(chat_info)

    # Devolver los chats en JSON
    return JsonResponse({'chats': chats_info})

