from django.urls import path

from chat import views

app_name = 'chat'

urlpatterns = [
    path('', views.index, name='index'),
    path('chat/<str:username>/', views.chat_page, name='chat_page'),
]
