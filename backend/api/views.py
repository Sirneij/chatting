import json

from django.contrib.auth import authenticate, get_user_model, login, logout
from django.core import serializers
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.views.decorators.http import require_POST

from api.utils import CustomSerializer
from chat.models import Message


def get_csrf(request):
    response = JsonResponse({'detail': 'CSRF cookie set'})
    response['X-CSRFToken'] = get_token(request)
    return response


@csrf_exempt
@require_POST
def login_view(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    if username is None or password is None:
        return JsonResponse({'detail': 'Please provide username and password.'}, status=400)

    user = authenticate(username=username, password=password)

    if user is None:
        return JsonResponse({'detail': 'Invalid credentials.'}, status=400)

    login(request, user)
    return JsonResponse(
        {
            'detail': 'Successfully logged in.',
            'user': json.loads(
                serializers.serialize(
                    'json',
                    [user],
                    fields=(
                        'last_login',
                        'is_superuser',
                        'username',
                        'first_name',
                        'last_name',
                        'email',
                        'is_staff',
                        'is_active',
                        'date_joined',
                    ),
                )
            ),
        }
    )


def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'You\'re not logged in.'}, status=400)

    logout(request)
    return JsonResponse({'detail': 'Successfully logged out.'})


@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'isAuthenticated': True})


def whoami_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'username': request.user.username})


def list_contacts(request):
    users = get_user_model().objects.exclude(username=request.GET.get('username'))
    data = serializers.serialize(
        'json',
        users,
        fields=(
            'last_login',
            'is_superuser',
            'username',
            'first_name',
            'last_name',
            'email',
            'is_staff',
            'is_active',
            'date_joined',
        ),
    )

    return JsonResponse(json.loads(data), safe=False)


def chat_page(request, username):
    user_object = get_user_model().objects.defer('password').get(username=username)
    user_object_serialized = serializers.serialize(
        'json',
        [user_object],
        fields=(
            'last_login',
            'is_superuser',
            'username',
            'first_name',
            'last_name',
            'email',
            'is_staff',
            'is_active',
            'date_joined',
        ),
    )
    users = serializers.serialize(
        'json',
        get_user_model().objects.exclude(username=request.GET.get('username')),
        fields=(
            'last_login',
            'is_superuser',
            'username',
            'first_name',
            'last_name',
            'email',
            'is_staff',
            'is_active',
            'date_joined',
        ),
    )
    request_user_id = request.GET["id"]
    thread_name = (
        f'chat_{request_user_id}_{user_object.id}'
        if int(request_user_id) > int(user_object.id)
        else f'chat_{user_object.id}_{request_user_id}'
    )
    custom_serializers = CustomSerializer()
    messages = custom_serializers.serialize(
        Message.objects.select_related().filter(thread_name=thread_name),
        fields=(
            'sender__pk',
            'sender__username',
            'sender__last_name',
            'sender__first_name',
            'sender__email',
            'sender__last_login',
            'sender__is_staff',
            'sender__is_active',
            'sender__date_joined',
            'sender__is_superuser',
            'message',
            'thread_name',
            'timestamp',
        ),
    )

    context = {
        'users': users,
        'user_object': user_object_serialized,
        'messages': messages,
    }
    return JsonResponse(json.loads(json.dumps(context)), safe=False)
