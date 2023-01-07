import { Component } from '@angular/core';
import { ActorDetailsService } from 'src/app/shared/services';

@Component({
  selector: 'app-actor-details',
  standalone: true,
  styles: [``],
  template: ` <p>actor-details works!</p> `,
})
export class ActorDetailsComponent {
  constructor(private service: ActorDetailsService) {
    this.service.initialize();
  }
}
