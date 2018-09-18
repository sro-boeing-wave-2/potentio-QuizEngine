import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute, ParamMap } from '@angular/router';
import { PlayerService } from '../player.service';
import { AdItem } from '../ad-item';
//import { PlayerComponent } from '../player/player.component';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
   userId: number;
   domain: string;
   //questionComponents: AdItem[];
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private playerService: PlayerService) { }

  ngOnInit() {
    console.log("inside start");
    this.activatedRoute.paramMap.subscribe((params: ParamMap)=> {
      let id = parseInt(params.get('id'));
      this.userId = id;

    });
    this.activatedRoute.paramMap.subscribe((params: ParamMap)=> {
      let d = params.get('domain');
      this.domain = d;
    });

  }

  startQuiz() {
   // this.questionComponents = this.playerService.getComponents();
    this.playerService.startQuiz(this.userId, this.domain);
    this.router.navigate(['/player',this.userId]);

  }
}
