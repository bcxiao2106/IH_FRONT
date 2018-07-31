import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { Page404Component } from './page404/page404.component';
import { QuestionsComponent } from './questions/questions.component';
import { ActiveDirective } from './directives/active.directive';
import { MatInputModule, MatSortModule, MatTableModule, MatPaginatorModule, MatFormFieldModule } from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriesComponent } from './categories/categories.component';
import { NewquestionComponent } from './newquestion/newquestion.component';
import { AnswerComponent } from './answer/answer.component';
import { ViewquestionComponent } from './viewquestion/viewquestion.component';
import { SelectedDirective } from './directives/selected.directive';
import { SearchboxComponent } from './searchbox/searchbox.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    Page404Component,
    QuestionsComponent,
    ActiveDirective,
    CategoriesComponent,
    NewquestionComponent,
    AnswerComponent,
    ViewquestionComponent,
    SelectedDirective,
    SearchboxComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
