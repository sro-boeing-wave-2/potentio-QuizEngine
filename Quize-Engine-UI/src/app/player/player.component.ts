import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
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
  @ViewChild(QuestionDirective) questionHost: QuestionDirective;


  constructor(private componentFactoryResolver: ComponentFactoryResolver,private playerService: PlayerService, private activatedRoute: ActivatedRoute) { }
  userId: number;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap)=> {
      let id = parseInt(params.get('id'));
      this.userId = id;
    });

    this.playerService
      .getQuestionStream()
      .subscribe(
        question => this.question = question,
        error => console.log(error)
      );
  }

  question : QuestionModel;

  onResponseReceived(response) {
    this.question.userResponse = response;
  }

  getNextQuestion() {
    return this.playerService.getNextQuestion(this.question);
    // this.loadComponent();
  }

  endQuiz() {
    //this.playerService.sendResponse(this.question);
    console.log("inside end quiz of player component");
    return this.playerService.endQuiz(this.question);
  }

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

}


