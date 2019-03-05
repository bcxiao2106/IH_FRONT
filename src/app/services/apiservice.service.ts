import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { Question } from '../models/question';
import { Category } from '../models/category';
import { Solution } from '../models/solution';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/enviornment.dev';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  private webApiHostURL = 'https://groupint.herokuapp.com/';
  private getQListURL = this.webApiHostURL + 'Questions';
  private getCatListURL = this.webApiHostURL + 'Categories';
  private getSolutionListURL = this.webApiHostURL + 'Answers';
  private postNewQuestionURL = this.webApiHostURL + 'api/NewQuestion';
  private putQuestionChangeURL = this.webApiHostURL + '';
  private postNewSolutionURL = this.webApiHostURL + 'api/NewSolution';

  constructor(private httpClient: HttpClient,
    private messageService: MessageService) {
  }

  getQuestions(): Observable<Question[]> {
    return this.httpClient.get<Question[]>(this.getQListURL)
      .pipe(
        catchError(this.handleError<Question[]>(`get Questions`)
        ));
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.getCatListURL)
      .pipe(
        catchError(this.handleError<Category[]>(`get Categories`)
        ));
  }

  getSolutions(questionId): Observable<Solution[]> {
    return this.httpClient.get<Solution[]>(this.getSolutionListURL, { params: new HttpParams().set('questionId', questionId) })
      .pipe(
        catchError(this.handleError<Solution[]>(`get Solutions`)
      ));
  }

  addNewQuestion(question: Question) {
    return this.httpClient.post(this.postNewQuestionURL, question)
      .pipe(
        catchError(this.handleError<Question>(`post Question`)
        ));
  }

  addNewSolution(solution: Solution) {
    return this.httpClient.post(this.postNewSolutionURL, solution)
      .pipe(
        catchError(this.handleError<Solution>(`post Solution`)
        ));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('InterviewHelper: ' + message);
  }
}
