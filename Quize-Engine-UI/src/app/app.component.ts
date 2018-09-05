import { Component } from '@angular/core';
import { AdComponents } from './adComponent';
import { PlayerService } from './player.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Quize-Engine-UI';
  questionComponents: AdComponents[];
  userId: string;
  domain: string;

  constructor(private playerService: PlayerService , private router : Router) {}

  ngOnInit() {
    this.questionComponents = this.playerService.getComponents();
    this.userId = "deepikamohan";
    this.domain = "java";
  }

/*   startQuiz() {
    this.router.navigate(['/player'])

  } */

}
