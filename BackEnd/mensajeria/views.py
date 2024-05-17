from django.http import JsonResponse
from .models import Chat, Mensaje
from django.contrib.auth.models import User
import json
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime
from .models import Mensaje, Chat,UsuarioChat
from django.core.paginator import Paginator,EmptyPage

def getChats(request,user_id):
    #Obtener el usuario
    user=User.objects.get(pk=user_id)

    #Obtener todos los chats relacionados con el usuario
    chats_usuario = UsuarioChat.objects.filter(usuario=user).values_list('chat_id', flat=True) 
    
    # Inicializar un array de objetos para almacenar la información de los chats
    chats_info = []

    for chat_id in set(chats_usuario):
        # Obtener el último mensaje del chat
        mensaje = Mensaje.objects.filter(chat_id=chat_id).order_by('-fecha', '-hora').first()

       # Obtener la fecha y hora del último mensaje
        if mensaje:
            fecha = mensaje.fecha.strftime('%Y-%m-%d')
            hora = mensaje.hora.strftime('%H:%M:%S')
            texto = mensaje.texto

        # Crear un diccionario con la información del chat
        chat_info = {
            'chat_id': chat_id,
            'texto': texto,
            'fecha': fecha,
            'hora': hora,
        }

        chats_info.append(chat_info)

    # Devolver los chats en JSON
    return JsonResponse({'chats': chats_info})


def getMessages(request,chat_id):
    #Obtenemos la página que quiere ver
    page = request.GET.get('page')
    chat= Chat.objects.get(pk=chat_id)
    messages = Mensaje.objects.filter(chat=chat).order_by('fecha', 'hora')
    messagesJson=[]
    
    paginator = Paginator(messages, 8)
    try:
        # Obtener los mensajes de la página actual
        page_obj = paginator.page(page)
    except EmptyPage:
        # Si la página está fuera de rango, devolver una página vacía
        page_obj = paginator.page(paginator.num_pages)

    for message in page_obj:
        message_info = {
            'usuario': message.usuario.username,
            'chat': message.chat.id,
            'texto': message.texto,
            'fecha': message.fecha.strftime('%Y-%m-%d'),
            'hora': message.hora.strftime('%H:%M:%S'),
            'num_pages': paginator.num_pages
        }
        messagesJson.append(message_info)

    # Devolver los mensajes en JSON
    return JsonResponse({'message': messagesJson})

# @csrf_exempt
# def getChats(request, id_user):
#     if request.method == 'POST':
#         data = json.loads(request.body)
#         nuevo_chat = Chat.objects.create() 
#         return JsonResponse({'message': 'Chat creado exitosamente'}, status=201)
#     else:
#         return JsonResponse({'error': 'Método no permitido'}, status=405)

# @csrf_exempt
# def createUser(request):
#     if request.method == 'POST':
#         data = json.loads(request.body)
#         nuevo_usuario = User.objects.create(username=data['username'], email=data['email'], password=data['password'])  
#         return JsonResponse({'message': 'Usuario creado exitosamente'}, status=201)
#     else:
#         return JsonResponse({'error': 'Método no permitido'}, status=405)
# @csrf_exempt
# def createMessage(request):
#     if request.method == 'POST':
#         data = json.loads(request.body)
#         chat_id = data['chat_id']
#         usuario_id = data['usuario_id']
#         texto = data['texto']
#         chat = Chat.objects.get(id=chat_id)
#         usuario = User.objects.get(id=usuario_id)
#         fecha_actual = datetime.now()
#         hora_actual = datetime.now().time()
#         nuevo_mensaje = Mensaje.objects.create(usuario=usuario, chat=chat, texto=texto, fecha=fecha_actual, hora=hora_actual)
        
#         return JsonResponse({'message': 'Mensaje enviado exitosamente'}, status=201)
#     else:
#         return JsonResponse({'error': 'Método no permitido'}, status=405)