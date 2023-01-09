import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { take } from 'rxjs';
import { ActorDetails, ActorDetailsService } from './actor-details.service';

interface ActorDetailsState {
  isLoading: boolean;
  currentActorDetails: ActorDetails | null;
  allActorsDetails: ActorDetails[];
}

@Injectable({ providedIn: 'root' })
export class ActorDetailsStore extends ComponentStore<ActorDetailsState> {
  readonly isLoading$ = this.select((state) => state.isLoading);
  private readonly setIsLoading = this.updater(
    (state, isLoading: boolean): ActorDetailsState => ({ ...state, isLoading })
  );

  readonly currentActorDetails$ = this.select(
    (state) => state.currentActorDetails
  );
  private readonly setCurrentActorDetails = this.updater(
    (state, currentActorDetails: ActorDetails): ActorDetailsState => ({
      ...state,
      currentActorDetails,
    })
  );

  private readonly allActorDetails$ = this.select(
    (state) => state.allActorsDetails
  );
  private readonly addToAllActorDetails = this.updater(
    (state, newActorDetails: ActorDetails): ActorDetailsState => ({
      ...state,
      allActorsDetails: [
        ...state.allActorsDetails,
        (state.allActorsDetails[newActorDetails.uid] = newActorDetails),
      ],
    })
  );

  constructor(private service: ActorDetailsService) {
    super({
      allActorsDetails: [],
      currentActorDetails: null,
      isLoading: false,
    });
  }

  ShowActorDetails(id: number): void {
    const actorAlreadyFound = this.checkIfActorAlreadyCached(id);

    if (actorAlreadyFound) {
      this.setCurrentActorDetails(actorAlreadyFound);
      return;
    }

    this.setIsLoading(true);
    this.service.fetchActorDetails(id).subscribe({
      next: (actorDetails) => {
        actorDetails.properties.worldId = this.getPlanetId(
          actorDetails.properties.homeworld
        );

        this.setCurrentActorDetails(actorDetails);
        this.addToAllActorDetails(actorDetails);

        this.setIsLoading(false);
      },
    });
  }

  private getPlanetId(url: string) {
    return url.split('/').pop() ?? 'n/a';
  }

  private checkIfActorAlreadyCached(id: number): ActorDetails | undefined {
    let actorFound;
    this.allActorDetails$
      .pipe(take(1))
      .subscribe(
        (actors) => (actorFound = actors.find((actor) => actor.uid === id))
      );

    return actorFound;
  }
}
