import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ActorDetailsStore } from './actor-details.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule],
  selector: 'app-actor-details',
  standalone: true,
  styleUrls: ['actor-details.component.sass'],
  template: `
    <p *ngIf="(isLoading$ | async) === true">Loading character details...</p>
    <ng-container
      *ngIf="(isLoading$ | async) === false && (actor$ | async) as actor"
    >
      <h1>Name: {{ actor.properties.name }}</h1>
      <p>Birth year: {{ actor.properties.birth_year }}</p>
      <p>Eye color: {{ actor.properties.eye_color }}</p>
      <p>Gender: {{ actor.properties.gender }}</p>
      <p>Hair color: {{ actor.properties.hair_color }}</p>
      <p>Height: {{ actor.properties.height }} cm</p>
      <p>Mass: {{ actor.properties.mass }} kg</p>
      <p>Skin color: {{ actor.properties.skin_color }}</p>

      <div class="actions">
        <button routerLink="['/']">&#8592; Back to characters</button>
        <button
          [routerLink]="['/planets/' + actor.properties.worldId]"
          [state]="{ cameFrom: actor.uid }"
        >
          See homeworld
        </button>
      </div>
    </ng-container>
  `,
})
export class ActorDetailsComponent {
  actor$ = this.store.currentActorDetails$;
  isLoading$ = this.store.isLoading$;
  private currentActor = this.route.snapshot.params['id'];

  constructor(private store: ActorDetailsStore, private route: ActivatedRoute) {
    this.store.ShowActorDetails(this.currentActor);
  }
}
