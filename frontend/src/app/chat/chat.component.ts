import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ChatService } from '../core/chat.service';
import { takeUntil, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { WebSocketSubject } from 'rxjs/webSocket';
import { ChatMessage } from '../core/chat-interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  
  username: string;
  messages: string[] = [];
  destructor = new Subject();
  websocket: WebSocketSubject<ChatMessage | string>;
  form = new FormGroup({
    message: new FormControl('', [Validators.required])
  })

  constructor(private chatService: ChatService, private router: Router) {
  }

  ngOnInit() {
    this.chatService.username$.pipe(
      takeUntil(this.destructor)
    ).subscribe((name) => {
      if (!name){
        this.router.navigate(['/']); // This should be in a guard.
        return;
      }
      this.username = name;
      this.connectToChat();
    });
  }

  connectToChat() {
    this.websocket = this.chatService.connectToChat(this.username);
    
    this.websocket.pipe(
      takeUntil(this.destructor),
      map(this.chatService.createStringFromMessage)
    ).subscribe((message) => this.messages.push(message));
  }

  sendMessage() {
    if (this.form.invalid) {
      return;
    }
    const control = this.form.get('message');
    this.websocket.next(control.value);
    control.setValue('');
  }

  ngOnDestroy() {
    if (this.websocket) {
      this.websocket.unsubscribe();
    }
    this.destructor.next();
    this.destructor.unsubscribe();
  }
}
