import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChatService } from '../core/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-namepicker',
  templateUrl: './namepicker.component.html',
  styleUrls: ['./namepicker.component.scss']
})
export class NamepickerComponent implements OnInit {

  form = new FormGroup({
    username: new FormControl('', [Validators.maxLength(20), Validators.required])
  })

  constructor(
    private chatService: ChatService,
    private router: Router) { }

  ngOnInit(): void {
  }

  connect() {
    if (this.form.invalid) {
      return;
    }
    this.chatService.assignUsername(this.form.get('username').value);
    this.router.navigate(['chat']);
  }

}
