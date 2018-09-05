import { Component, OnInit, Input } from '@angular/core';
import { QuestionModel } from '../questionModule';
@Component({
  selector: 'app-fill-in-the-blanks',
  templateUrl: './fill-in-the-blanks.component.html',
  styleUrls: ['./fill-in-the-blanks.component.css']
})
export class FillInTheBlanksComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  @Input() data: QuestionModel;

}
