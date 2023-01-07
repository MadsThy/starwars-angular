import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ActorDetailsService {
  constructor() {}

  initialize() {
    console.log('init actor-details API');
  }
}
