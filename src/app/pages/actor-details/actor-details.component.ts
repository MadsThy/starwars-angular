import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActorDetailsStore } from './actor-details.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule],
  selector: 'app-actor-details',
  standalone: true,
  styles: [``],
  template: `<button routerLink="..">Back</button>`,
})
export class ActorDetailsComponent {
  constructor(private store: ActorDetailsStore) {}
}
