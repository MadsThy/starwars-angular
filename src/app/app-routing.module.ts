import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorDetailsComponent, ActorsComponent } from './pages';
import { PlanetComponent } from './pages/planet/planet.component';

const routes: Routes = [
  { path: '', component: ActorsComponent },
  { path: 'actors/:id', component: ActorDetailsComponent },
  { path: 'planets/:id', component: PlanetComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
