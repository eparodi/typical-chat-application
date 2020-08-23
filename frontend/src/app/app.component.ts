import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from './core/chat.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  username: string;
  destructor = new Subject();

  constructor(private chatService: ChatService) {
  }

  ngOnInit() {
    this.chatService.username$.pipe(
      takeUntil(this.destructor)
    ).subscribe((name) => this.username = name);
  }
  
  ngOnDestroy() {
    this.destructor.next();
    this.destructor.unsubscribe();
  }
}
