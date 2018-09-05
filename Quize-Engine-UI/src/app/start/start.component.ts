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
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private playerService: PlayerService) { }

  ngOnInit() {
    console.log("inside start");
    this.activatedRoute.paramMap.subscribe((params: ParamMap)=> {
      let id = parseInt(params.get('id'));
      this.userId = id;

    });


  }

  startQuiz() {
    //this.playerService.onConnectionMapping(this.userId);
    this.router.navigate(['/player',{id: this.userId}])

  }
}
