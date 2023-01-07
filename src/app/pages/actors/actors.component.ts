import { Component } from '@angular/core';
import { ActorsService } from 'src/app/shared/services';

@Component({
  selector: 'app-actors',
  standalone: true,
  styles: [``],
  template: ` <p>Starwars app is running!</p> `,
})
export class ActorsComponent {
  constructor(private service: ActorsService) {
    this.service.initialize();
  }
}
