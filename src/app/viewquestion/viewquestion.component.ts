import { Component, OnInit, Input } from '@angular/core';
import { Solution } from '../models/solution';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-viewquestion',
  templateUrl: './viewquestion.component.html',
  styleUrls: ['./viewquestion.component.css']
})
export class ViewquestionComponent implements OnInit {
  @Input('questionId') questionId: number;
  @Input('questionTitle') questionTitle: string;
  solutionList: Solution[];

  constructor(private apiService: ApiserviceService) {
  }

  ngOnInit() {
  }

  loadSolutions() {
    this.apiService.getSolutions(this.questionId)
    .subscribe(solutions => {
      if (!solutions) {
        return;
      }
      this.solutionList = solutions;
  });
  }

}
