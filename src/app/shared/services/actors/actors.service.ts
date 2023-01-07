import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ActorsService {
  constructor() {}

  initialize() {
    console.log('init actors API');
  }
}
