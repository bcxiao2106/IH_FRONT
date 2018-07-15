import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { Question } from '../models/question';
import { Category } from '../models/category';
import { createRendererV1 } from '../../../node_modules/@angular/core/src/view/refs';

@Component({
  selector: 'app-newquestion',
  templateUrl: './newquestion.component.html',
  styleUrls: ['./newquestion.component.css']
})
export class NewquestionComponent implements OnInit {
  question: Question;
  categories: Category[];
  @Output() newQuestionAdded: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private apiService: ApiserviceService) {
    this.question = new Question();
  }

  ngOnInit() {
  }

  loadCategories() {
    this.apiService.getCategories()
    .subscribe(categoryList => {
      if (!categoryList) {
        return;
      }
      this.categories = categoryList.sort((cate1, cate2) => {
        return cate1.CategoryName.localeCompare(cate2.CategoryName);
      });
    });
  }

  addNewQuestion() {
    this.apiService.addNewQuestion(this.question)
    .subscribe(question => {
      if (!question) {
        return;
      }
      this.question = new Question();
      this.newQuestionAdded.emit(true);
    });
  }
}
