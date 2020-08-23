import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { ChatMessage, ChatMessageType } from './chat-interfaces'

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private username = new BehaviorSubject(null);
  username$ = this.username.asObservable();

  constructor() { }

  assignUsername(username: string) {
    this.username.next(username);
  }

  connectToChat(username: string) {
    return webSocket(
      `ws://localhost:8000/chat/?name=${username}`
    ) as WebSocketSubject<ChatMessage | string>;
  }

  createStringFromMessage(message: ChatMessage) {
    switch (message.type) {
      case ChatMessageType.Connect:
        return `${message.sender} joined the chat!`;
      case ChatMessageType.Disconnect:
        return `${message.sender} left the chat. :c`;
      case ChatMessageType.Message:
        return `${message.sender}: ${message.message}`;
    }
  }
}
