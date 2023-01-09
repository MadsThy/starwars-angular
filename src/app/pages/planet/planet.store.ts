import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { take } from 'rxjs';
import { Planet, PlanetService } from './planet.service';

interface PlanetState {
  isLoading: boolean;
  currentPlanet: Planet | null;
  AllPlanets: Planet[];
}

@Injectable({ providedIn: 'root' })
export class PlanetStore extends ComponentStore<PlanetState> {
  readonly isLoading$ = this.select((state) => state.isLoading);
  private readonly setIsLoading = this.updater(
    (state, isLoading: boolean): PlanetState => ({ ...state, isLoading })
  );

  readonly currentPlanet$ = this.select((state) => state.currentPlanet);
  private readonly setCurrentPlanet = this.updater(
    (state, currentPlanet: Planet): PlanetState => ({
      ...state,
      currentPlanet,
    })
  );

  private readonly allPlanets$ = this.select((state) => state.AllPlanets);
  private readonly addToAllPlanets = this.updater(
    (state, newPlanet: Planet): PlanetState => ({
      ...state,
      AllPlanets: [
        ...state.AllPlanets,
        (state.AllPlanets[newPlanet.uid] = newPlanet),
      ],
    })
  );

  constructor(private service: PlanetService) {
    super({
      AllPlanets: [],
      currentPlanet: null,
      isLoading: false,
    });
  }

  ShowPlanet(id: number): void {
    const planetAlreadyFound = this.checkIfPlanetAlreadyCached(id);

    if (planetAlreadyFound) {
      this.setCurrentPlanet(planetAlreadyFound);
      return;
    }

    this.setIsLoading(true);
    this.service.fetchPlanet(id).subscribe({
      next: (planet) => {
        this.setCurrentPlanet(planet);
        this.addToAllPlanets(planet);

        this.setIsLoading(false);
      },
    });
  }

  private checkIfPlanetAlreadyCached(id: number): Planet | undefined {
    let planetFound;
    this.allPlanets$
      .pipe(take(1))
      .subscribe(
        (planets) => (planetFound = planets.find((planet) => planet.uid === id))
      );

    return planetFound;
  }
}
