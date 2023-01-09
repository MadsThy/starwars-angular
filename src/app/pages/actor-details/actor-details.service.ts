import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface ActorDetails {
  description: string;
  properties: {
    birth_year: string;
    eye_color: string;
    gender: string;
    hair_color: string;
    height: string;
    homeworld: string;
    worldId: string;
    mass: string;
    name: string;
    skin_color: string;
  };
  uid: number;
}
interface ActorResponse {
  message: string;
  result: ActorDetails;
}

@Injectable({ providedIn: 'root' })
export class ActorDetailsService {
  constructor(private http: HttpClient) {}

  fetchActorDetails(number = 1): Observable<ActorDetails> {
    return this.http
      .get<ActorResponse>(`https://www.swapi.tech/api/people/${number}`)
      .pipe(
        map((details) => {
          return details.result;
        })
      );
  }
}
