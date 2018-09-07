import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute, ParamMap } from '@angular/router';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  userId: number;
  domain: string;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private playerService: PlayerService) { }

  ngOnInit() {
    console.log("inside start");
    this.activatedRoute.paramMap.subscribe((params: ParamMap)=> {
      let id = parseInt(params.get('id'));
      this.userId = id;
    });
    this.activatedRoute.paramMap.subscribe((params: ParamMap)=> {
      let domain = params.get('domain');
      this.domain = domain;
      console.log("domain is " + domain);
    });
  }

  startQuiz() {
    this.playerService.startQuiz(this.userId, this.domain);
    this.router.navigate(['/player',this.userId]);
  }
}
