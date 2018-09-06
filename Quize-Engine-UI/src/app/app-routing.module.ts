import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerComponent } from './player/player.component';
import { StartComponent } from './start/start.component';

const routes: Routes = [
  { path: '',redirectTo: '/start:id/:domain',  pathMatch: 'full'},
  {path:'start/:id/:domain', component:StartComponent},
  {path:'player/:id', component:PlayerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [PlayerComponent, StartComponent];
