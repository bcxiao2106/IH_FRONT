import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatFormField, MatAutocomplete, MatOption } from '@angular/material';
import { ApiserviceService } from '../services/apiservice.service';
import { Question } from '../models/question';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  activeBgColor = 'white';
  activeColor = '#F8510D';
  displayedColumns: string[] = ['qid', 'cid', 'questionTitle', 'questionDesc', 'Ops'];
  dataSource: MatTableDataSource<Question> = new MatTableDataSource();
  questions: Question[];
  filteredQuestions: Question[];
  selectedCategories: number[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.apiService.getQuestions()
      .subscribe(questionList => {
        if (!questionList) {
          return;
        }
        this.questions = questionList;
        this.dataSource.data = this.questions;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  constructor(private apiService: ApiserviceService) { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  refresh(goToPage: string) { // event from child component
    if (goToPage === 'last') {
      this.paginator.lastPage();
    }
    this.ngOnInit(); // reload the data
  }

  filter(categories) {
    if (categories.length === 0) {
      this.dataSource.data = this.questions;
      // this.ngOnInit();
    } else {
      this.filteredQuestions = this.questions.filter(q => {
        return (categories.indexOf(q.cid) !== -1);
      });
      this.dataSource.data = this.filteredQuestions; // binding filtered data to MatTable
    }
  }

  quickAnswer(row: any) {
    console.log(row);
  }
}
