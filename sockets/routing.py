from django.conf.urls import url
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from sockets.consumers import ChatConsumer

application = ProtocolTypeRouter({
    "websocket":
        URLRouter([
            url(r"^chat/$", ChatConsumer),
        ])
})