from django.urls import path

from api import views

urlpatterns = [
    path('csrf/', views.get_csrf, name='api-csrf'),
    path('login/', views.login_view, name='api-login'),
    path('logout/', views.logout_view, name='api-logout'),
    path('session/', views.session_view, name='api-session'),
    path('whoami/', views.whoami_view, name='api-whoami'),
    path('list-contacts/', views.list_contacts, name='list-contacts'),
    path('chat/<str:username>/', views.chat_page, name='chat-page'),
]
