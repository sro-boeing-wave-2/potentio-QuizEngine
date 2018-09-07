import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';
import { Injectable, EventEmitter, Input } from '@angular/core';
import { QuestionModel } from './questionModule';
import { Subject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseModel } from './responseModel';
import { Router } from '@angular/router';

@Injectable()
export class PlayerService {
  private _connection: HubConnection;
  private _question: Subject<any>;
  result: ResponseModel;

  @Input() response: any;

  constructor(private router: Router)
  {
    this._question = new Subject();
  }

  startQuiz(userId: number)
  {
    this._connection = new HubConnectionBuilder().withUrl("http://localhost:9050/question").build();
    this._connection.on('NextQuestion', this.onNextQuestionHandler.bind(this));
    // this._connection.on('EndQuiz', this.onQuizEnded.bind(this));
    this._connection.start().then(() => { this._connection.invoke('StartQuiz', userId); });
  }

  getQuestionStream(): Observable<QuestionModel> {
    return this._question.pipe(catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse) {
    return throwError(err.message || "Not Found");
  }

  getNextQuestion(response: QuestionModel) {
    //console.log("this is inside Get next question " + response.userResponse);
    return this._connection.invoke('GetNextQuestion', response);
  }

  onNextQuestionHandler(nextQuestion) {
    return this._question.next(nextQuestion);
  }

  endQuiz(question : QuestionModel) {
    console.log("inside end quiz of player service");
    this._connection.invoke('EndQuiz', question);
    this._connection.on('EndQuiz', msg => {
         this.result = msg;
         console.log("result is " +  this.result.userID);
         //this.router.navigate("localhost:4200/")
          });

  }

  // onQuizEnded() {
  //   this._connection.invoke('endQuiz');
  //   // this._connection.on('endQuiz', msg => {
  //   //   this.result = msg;
  //   //   console.log("result is " + this.result.questionAttendedCount);
  //   // });

  // }

  // getComponents() {
  //   return [
  //     new AdComponents(McqComponent, "hello man"),
  //     new AdComponents(FillInTheBlanksComponent,"hello sddc")
  //   ];
  // }
}

