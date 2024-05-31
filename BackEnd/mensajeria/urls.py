from django.urls import path
from mensajeria import views

urlpatterns = [
    path('getChatsJSON/<int:user_id>/',views.getChatsJSON,name='getChatsJSON'),
    path('getMessagesJSON/<int:chat_id>/',views.getMessagesJSON,name='getMessagesJSON'),
    path('setMessageJSON/',views.setMessageJSON,name='setMessageJSON'),
    path('setChatJSON/',views.setChatJSON,name='setChatJSON'),

    path('chat/',views.chatView,name='chatView'),
    path('allClients/',views.allClients,name='allClients'),
    path('allEmployees/',views.allEmployees,name='allEmployees'),
]
