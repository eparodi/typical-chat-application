import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NamepickerComponent } from './namepicker/namepicker.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: '**', component: NamepickerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
