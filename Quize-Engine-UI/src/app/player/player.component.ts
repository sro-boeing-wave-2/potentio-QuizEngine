import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
//import { Input } from '@angular/core/src/metadata/directives';
import { QuestionDirective} from '../question.directive';
import { AdComponents } from '../adComponent';
import { QuestionModel } from '../questionModule';
import { PlayerService } from '../player.service';
import { McqComponent} from '../mcq/mcq.component';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() questionComponents: AdComponents[];
 // @Input() userId: string;
 // @Input() domain: string;
  @ViewChild(QuestionDirective) questionHost: QuestionDirective;


  constructor(private componentFactoryResolver: ComponentFactoryResolver,private playerService: PlayerService, private activatedRoute: ActivatedRoute) { }
  userId: number;
  ngOnInit() {
    //this.loadComponent();
   // this.playerService.getComponents();
  console.log("inside playerrrrr");
  this.activatedRoute.paramMap.subscribe((params: ParamMap)=> {
    let id = parseInt(params.get('id'));
    this.userId = id;
  });
  this.playerService.onConnectionMapping(this.userId);
    this.playerService.getQuestionStream().subscribe(question => this.question = question, error => console.log(error));
    console.log(this.question);
  }
x
 response : any= "deepika";
 //@Input() response : any;
  question : QuestionModel;
  count: number = 0;

// startQuiz() {
//   console.log("Start Quiz button pressed");
//   this.playerService.getQuestionStream().subscribe(question => {
//     console.log("Inside Subscribe");
//     this.question = question;
//     console.log(question);
//   }, error => console.log(error));
//   console.log(this.question);
// }

 onResponseReceived(response) {
   console.log(response);
   console.log("Response Received", response);
   this.question.userResponse = response;


 }

getNextQuestion() {
    console.log("getting next question");
  //  this.playerService.getNextQuestion().then(data => {
  //    this.question = data;
  //    this.loadComponent();
  //   });
 // this.playerService.sendResponse(this.response);
 this.playerService.sendResponse(this.question);
  console.log("this is the response  " + this.response);
  return this.playerService.getNextQuestion();
  //this.loadComponent();

   // console.log("question banthu"+ this.question);

  }
  public sendData(response: string){
    console.log('response is: ', response);
}
  // sendResponse() {
  //   this.playerService.sendResponse(this.response);
  // }

  // loadComponent() {

  //   console.log("printiing question compoennt"+this.questionComponents);
  //   let adItem = this.questionComponents[0];
  //   //this.count++;
  //   //console.log("inside load component" + adItem.component);
  //   let componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

  //   let viewContainerRef = this.questionHost.viewContainerRef;
  //   viewContainerRef.clear();

  //   let componentRef = viewContainerRef.createComponent(componentFactory);
  //   (<AdComponents>componentRef.instance).data = this.question;
  // }

  // ngAfterViewInit() {
  //   this.response = this.mcq.response
  // }
}


