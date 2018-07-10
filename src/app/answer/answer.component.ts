import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { Solution } from '../models/solution';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  @Input('questionId') questionId: number;
  @Input('questionTitle') questionTitle: string;
  @Output() newSolutionAdded: EventEmitter<boolean> = new EventEmitter<boolean>();

  newSolution: Solution = new Solution();

  constructor(private apiService: ApiserviceService) { }

  ngOnInit() {
    this.newSolution.QuestionId = this.questionId;
  }

  addNewAnswer() {
    let solutionDetail: string;
    solutionDetail = this.newSolution.SolutionDetails.replace(/\n/g, '<br/>'); // replace all \n to <br/>
    this.newSolution.SolutionDetails = solutionDetail;
    this.apiService.addNewSolution(this.newSolution)
    .subscribe(newSolution => {
      if (!newSolution) {
        return;
      }
      this.newSolutionAdded.emit(true);
    });
  }

}
