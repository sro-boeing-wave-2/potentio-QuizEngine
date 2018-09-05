import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MaterialModule} from '../materialmodule';
import { FormsModule } from '@angular/forms';
import { MatRadioModule} from '@angular/material/radio';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { McqComponent } from './mcq/mcq.component';
import { QuestionDirective } from './question.directive';
import { PlayerService } from './player.service';
import { FillInTheBlanksComponent } from './fill-in-the-blanks/fill-in-the-blanks.component';
import { StartComponent } from './start/start.component';


@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    McqComponent,
    QuestionDirective,
    FillInTheBlanksComponent,
    StartComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatRadioModule,
    MaterialModule
  ],
  providers: [
    PlayerService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    McqComponent,
    FillInTheBlanksComponent
  ]
})
export class AppModule { }
