import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorDetailsComponent, ActorsComponent } from './pages';

const routes: Routes = [
  { path: '', component: ActorsComponent },
  { path: 'actors/:id', component: ActorDetailsComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
