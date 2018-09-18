import { Component, OnInit } from '@angular/core';
import { PlayerService } from './player.service';
import { AdItem } from './ad-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {

  questionComponents: AdItem[];


  constructor() {}

  ngOnInit() {



  }
}
