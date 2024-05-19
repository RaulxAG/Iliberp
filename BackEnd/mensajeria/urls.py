from django.urls import path
from mensajeria import views

urlpatterns = [
    path('getChats/<int:user_id>/',views.getChats,name='getChats'),
    path('getMessages/<int:chat_id>/',views.getMessages,name='getMessages'),
    path('setMessage/',views.setMessage,name='setMessage'),
    path('setChat/',views.setChat,name='setChat')
]
