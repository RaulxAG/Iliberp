from django.urls import path
from mensajeria import views

urlpatterns = [
    # path('api/getChat/<int:id_user>/', getChat, name='get_chat'),
    # path('create_user/', views.createUser, name='create_user'),
    # path('create_message/', views.createMessage, name='create_message'),
    path('getChats/<int:user_id>/',views.getChats,name='getChats'),
    path('getMessages/<int:chat_id>/',views.getMessages,name='getMessages')
]
