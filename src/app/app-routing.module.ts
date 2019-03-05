import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './page404/page404.component';
import { AppComponent } from './app.component';
import { QuestionsComponent } from './questions/questions.component';

const routes: Routes = [
  {path: '', redirectTo: 'Questions/tech', pathMatch: 'full'},
  {path: 'Questions/:qtype', component: QuestionsComponent,  },
  {path: '**', component: Page404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
