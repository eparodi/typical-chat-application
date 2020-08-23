from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync
import urllib.parse

class ChatConsumer(JsonWebsocketConsumer):

    MESSAGE = "message"
    CONNECT = "connect"
    DISCONNECT = "disconnect"

    def connect(self):
        username = self.get_username()
        if not username:
            self.close()
        self.scope['username'] = username
        async_to_sync(self.channel_layer.group_add)("chat", self.channel_name)
        self.accept()
        self.send_group_connect_message()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)("chat", self.channel_name)
        self.send_group_disconnect_message()

    def receive(self, text_data):
        async_to_sync(self.channel_layer.group_send)(
            "chat",
            {
                "type": "chat.message",
                "text": text_data[1:-1],
                "sender": self.scope['username']
            },
        )

    def send_group_connect_message(self):
        async_to_sync(self.channel_layer.group_send)(
            "chat",
            {
                "type": "connect.message",
                "sender": self.scope['username']
            },
        )
    
    def send_group_disconnect_message(self):
        if not self.scope["username"]:
            return
        async_to_sync(self.channel_layer.group_send)(
            "chat",
            {
                "type": "disconnect.message",
                "sender": self.scope['username']
            },
        )

    def get_username(self):
        params = urllib.parse.parse_qs(self.scope['query_string'].decode('utf8'))
        return params.get('name', (None,))[0]

    def connect_message(self, event):
        self.send_json({
            "type": self.CONNECT,
            "message": "Someone connected to the chat!",
            "sender": event["sender"],
        })

    def disconnect_message(self, event):
        self.send_json({
            "type": self.DISCONNECT,
            "message": "Someone disconnected from the chat :c",
            "sender": event["sender"],
        })

    def chat_message(self, event):
        self.send_json({
            "type": self.MESSAGE,
            "message": event["text"],
            "sender": event["sender"],
        })
