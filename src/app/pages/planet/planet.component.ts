import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlanetStore } from './planet.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule],
  selector: 'app-planet',
  standalone: true,
  styleUrls: ['planet.component.sass'],
  template: `
    <p *ngIf="(isLoading$ | async) === true">Loading planet details...</p>
    <ng-container
      *ngIf="(isLoading$ | async) === false && (planet$ | async) as planet"
    >
      <h1>Name: {{ planet.properties.name }}</h1>
      <p>Climate: {{ planet.properties.climate }}</p>
      <p>Diameter: {{ planet.properties.diameter }} km</p>
      <p>Gravity: {{ planet.properties.gravity }}</p>
      <p>Orbital Period: {{ planet.properties.orbital_period }}</p>
      <p>Population: {{ planet.properties.population }}</p>
      <p>Rotation Period: {{ planet.properties.rotation_period }}</p>
      <p>Surface Water: {{ planet.properties.surface_water }}</p>
      <p>Terrain: {{ planet.properties.terrain }}</p>

      <div class="actions">
        <button
          *ngIf="cameFromActor"
          [routerLink]="['/actors/' + cameFromActor]"
        >
          &#8592; Back to character
        </button>
        <button routerLink="/">Go to main character list</button>
      </div>
    </ng-container>
  `,
})
export class PlanetComponent {
  planet$ = this.store.currentPlanet$;
  isLoading$ = this.store.isLoading$;
  cameFromActor: number | null = null;
  private currentPlanet = this.route.snapshot.params['id'];

  constructor(
    private store: PlanetStore,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.store.ShowPlanet(this.currentPlanet);
    this.cameFromActor =
      this.router.getCurrentNavigation()?.extras.state?.['cameFrom'] ?? null;
  }
}
