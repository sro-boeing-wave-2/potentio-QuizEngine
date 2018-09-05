import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';
import { Injectable, EventEmitter, Input } from '@angular/core';
import { McqComponent }  from './mcq/mcq.component';

import { AdComponents} from './adComponent';
import { QuestionModel } from './questionModule';
import { FillInTheBlanksComponent } from './fill-in-the-blanks/fill-in-the-blanks.component';
import { Subject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class PlayerService {
  private _connection: HubConnection;
  private _question: Subject<any>;
  @Input() response: any;
  constructor()
  {
    this._question = new Subject();
    this._connection = new HubConnectionBuilder().withUrl("http://172.23.238.237:8050/question").build();
    this._connection.on('NextQuestion', this.onNextQuestionHandler.bind(this));
    this._connection.on('EndOfQuestions', this.onEndOfQuestionHandler);
    this._connection.start().then(() => console.log('MessageHub Connected'));
  }

  getQuestionStream(): Observable<QuestionModel> {
    return this._question.pipe(catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse) {
    return throwError(err.message || "Not Found");
  }
  onConnectionMapping(userId: number) {
    this._connection.invoke('onConnectionMapping', userId);
    this._connection.on('onConnectionMapping', msg => {
      console.log(msg);
    });
  }
  sendResponse(response: QuestionModel) {
    this._connection.invoke('send', response);
      this._connection.on('send', msg => {
        console.log(msg);
      });
  }

  getNextQuestion() {
    return this._connection.invoke('GetNextQuestion');
  }

  onNextQuestionHandler(nextQuestion) {
    console.log(this);
    return this._question.next(nextQuestion);
  }

  onEndOfQuestionHandler() {
    console.log("Received End of Questions");
  }
  getComponents() {
  //  var q : QuestionModel;
  //   q.Quesid = 9;
  //   q.QuestionText = "where is INdia";
    return [
      new AdComponents(McqComponent, "hello man"),
      new AdComponents(FillInTheBlanksComponent,"hello sddc")
    ];
  }
}

