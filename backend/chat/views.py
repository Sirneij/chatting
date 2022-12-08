from django.contrib.auth import get_user_model
from django.shortcuts import render

from chat.models import Message


def index(request):
    users = get_user_model().objects.exclude(username=request.user.username)
    context = {'users': users}
    return render(request, 'index.html', context)


def chat_page(request, username):
    user_object = get_user_model().objects.get(username=username)
    users = get_user_model().objects.exclude(username=request.user.username)
    thread_name = (
        f'chat_{request.user.id}_{user_object.id}'
        if int(request.user.id) > int(user_object.id)
        else f'chat_{user_object.id}_{request.user.id}'
    )
    messages = Message.objects.filter(thread_name=thread_name).select_related('sender')
    context = {
        'users': users,
        'user_object': user_object,
        'messages': messages,
    }
    return render(request, 'chat.html', context)
