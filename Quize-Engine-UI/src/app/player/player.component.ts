import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { QuestionDirective} from '../question.directive';
import { AdComponents } from '../adComponent';
import { QuestionModel } from '../questionModule';
import { PlayerService } from '../player.service';
import { McqComponent} from '../mcq/mcq.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AdItem } from '../ad-item';
import { FillInTheBlanksComponent } from '../fill-in-the-blanks/fill-in-the-blanks.component';
import { LocalStorageService } from 'ngx-webstorage';
import { MCQModel } from '../MCQModel';
import { MMCQModel } from '../../MMCQModel';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() questionComponents: AdItem[];
  @ViewChild(QuestionDirective) questionHost: QuestionDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,private playerService: PlayerService, private activatedRoute: ActivatedRoute, private localStorage: LocalStorageService) {

   }
  userId: number;
  domainName: string;
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';
  questionType : string;
  ngOnInit() {

    this.activatedRoute.paramMap.subscribe((params: ParamMap)=> {
      let id = parseInt(params.get('id'));
      this.userId = id;
    });
    this.activatedRoute.paramMap.subscribe((params: ParamMap)=> {
      let domain = params.get('domain');
      this.domainName = domain;
    });

    this.playerService
      .getQuestionStream()
      .subscribe(
        question => {
          this.question = question;
          this.loadComponent(this.question);
        },
        error => console.log(error)
      );

     this.questionComponents = this.playerService.getComponents();
     this.startTime = new Date();
     this.timer = setInterval(() => { this.tick(); }, 1000);
     this.duration = this.parseTime(300);
  }
  question : any;
  mcqQuestion : MCQModel;
  mmcqQuestion : MMCQModel;
  onResponseReceived(response) {
    console.log("this is the user response " + response);
    this.question.userResponse = response;
  }

  getNextQuestion() {
    console.log("Testing ", this.localStorage.retrieve("response"));
    this.questionType = this.question["questionType"];
    switch(this.questionType) {
      case "MCQ":
      {
      this.mcqQuestion.response = this.localStorage.retrieve("response");
      return this.playerService.getNextQuestion(this.mcqQuestion).then(()=>this.loadComponent(this.question));
      }

      case "MMCQ":
      {
      this.mmcqQuestion.response = this.localStorage.retrieve("response");
      return this.playerService.getNextQuestion(this.mmcqQuestion).then(()=>this.loadComponent(this.question));
      }
    }


    // this.loadComponent();
  }

  endQuiz() {

    this.question.userResponse = this.localStorage.retrieve("response");
    return this.playerService.endQuiz(this.question);
  }
  tick() {
      const now = new Date();
      const diff = (now.getTime() - this.startTime.getTime()) / 1000;
      if (diff >= 300 && diff< 301) {
        this.endQuiz();
      }
      this.ellapsedTime = this.parseTime(diff);
    }

    parseTime(totalSeconds: number) {
      let mins: string | number = Math.floor(totalSeconds / 60);
      let secs: string | number = Math.round(totalSeconds % 60);
      mins = (mins < 10 ? '0' : '') + mins;
      secs = (secs < 10 ? '0' : '') + secs;
      return `${mins}:${secs}`;
    }
  loadComponent(question:any) {


    let adItem;
    this.questionType = question["questionType"];
    console.log("INSIDE LOAD COMPONENT " + this.questionType);
    switch(this.questionType) {
      case "MCQ":
      {
      this.mcqQuestion = question;
      adItem = this.questionComponents[0];
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
      let viewContainerRef = this.questionHost.viewContainerRef;
      viewContainerRef.clear();
      let componentRef = viewContainerRef.createComponent(componentFactory);
      (<AdComponents>componentRef.instance).question = this.mcqQuestion;
      }
      break;
      case "MMCQ":
      {
      this.mmcqQuestion = question;
      adItem = this.questionComponents[0];
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
      let viewContainerRef = this.questionHost.viewContainerRef;
      viewContainerRef.clear();
      let componentRef = viewContainerRef.createComponent(componentFactory);
      (<AdComponents>componentRef.instance).question = this.mmcqQuestion;
      }
      break;

    }
    // if(question.questionType == "MCQType")
    // {
    //    adItem = this.questionComponents[0];
    // }
    // else {
    //    adItem = this.questionComponents[1];
    // }


  }


}


