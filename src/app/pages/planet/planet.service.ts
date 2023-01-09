import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface Planet {
  description: string;
  properties: {
    climate: string;
    diameter: string;
    gravity: string;
    name: string;
    orbital_period: string;
    population: string;
    rotation_period: string;
    surface_water: string;
    terrain: string;
  };
  uid: number;
}
interface PlanetResponse {
  message: string;
  result: Planet;
}

@Injectable({ providedIn: 'root' })
export class PlanetService {
  constructor(private http: HttpClient) {}

  fetchPlanet(number = 1): Observable<Planet> {
    return this.http
      .get<PlanetResponse>(`https://www.swapi.tech/api/planets/${number}`)
      .pipe(
        map((details) => {
          return details.result;
        })
      );
  }
}
