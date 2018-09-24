import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { QuestionModel } from '../questionModule';
import { AdComponents} from '../adComponent';
import { LocalStorageService } from 'ngx-webstorage';
@Component({
  selector: 'app-mmcq',
  templateUrl: './mmcq.component.html',
  styleUrls: ['./mmcq.component.css']
})
export class MmcqComponent implements OnInit, AdComponents {

  private _response : string;
  public options : string[];

  get response() {
    return this._response;
  }

  set response(responseValue) {
    console.log(responseValue);
    this._response = responseValue;
    this.localStorage.store("response", responseValue);
    this.onResponse.emit(responseValue);
  }

  constructor(private localStorage : LocalStorageService) { }

  ngOnInit() {
  }

  @Input() question: QuestionModel;
  @Output() onResponse = new EventEmitter<any>();

}
