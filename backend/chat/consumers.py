import json

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth import get_user_model

from api.utils import CustomSerializer
from chat.models import Message


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        current_user_id = self.scope['user'].id if self.scope['user'].id else int(self.scope['query_string'])
        other_user_id = self.scope['url_route']['kwargs']['id']
        self.room_name = (
            f'{current_user_id}_{other_user_id}'
            if int(current_user_id) > int(other_user_id)
            else f'{other_user_id}_{current_user_id}'
        )
        self.room_group_name = f'chat_{self.room_name}'
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        # await self.send(text_data=self.room_group_name)

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_layer)
        await self.disconnect(close_code)

    async def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data)
        message = data['message']
        sender_username = data['senderUsername'].replace('"', '')
        sender = await self.get_user(sender_username.replace('"', ''))

        await self.save_message(sender=sender, message=message, thread_name=self.room_group_name)

        messages = await self.get_messages()

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'senderUsername': sender_username,
                'messages': messages,
            },
        )

    async def chat_message(self, event):
        message = event['message']
        username = event['senderUsername']
        messages = event['messages']

        await self.send(
            text_data=json.dumps(
                {
                    'message': message,
                    'senderUsername': username,
                    'messages': messages,
                }
            )
        )

    @database_sync_to_async
    def get_user(self, username):
        return get_user_model().objects.filter(username=username).first()

    @database_sync_to_async
    def get_messages(self):
        custom_serializers = CustomSerializer()
        messages = custom_serializers.serialize(
            Message.objects.select_related().filter(thread_name=self.room_group_name),
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
        return messages

    @database_sync_to_async
    def save_message(self, sender, message, thread_name):
        Message.objects.create(sender=sender, message=message, thread_name=thread_name)
