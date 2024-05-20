from django.urls import path
from mensajeria import views

urlpatterns = [
    path('getChatsJSON/<int:user_id>/',views.getChatsJSON,name='getChatsJSON'),
    path('getMessagesJSON/<int:chat_id>/',views.getMessagesJSON,name='getMessagesJSON'),
    path('setMessageJSON/',views.setMessageJSON,name='setMessageJSON'),
    path('setChatJSON/',views.setChatJSON,name='setChatJSON')
]
