import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerComponent } from './player/player.component';

import { StartComponent } from './start/start.component';


const routes: Routes = [
  { path: '',redirectTo: '/start:id',  pathMatch: 'full'},
  {path:'start/:id', component:StartComponent},
  {path:'player/:id', component:PlayerComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [PlayerComponent, StartComponent];
