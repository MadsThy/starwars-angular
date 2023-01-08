import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Actor {
  name: string;
  uid: number;
  url: string;
}
interface ActorResponse {
  message: string;
  next: string | null;
  previous: string | null;
  results: Actor[];
  total_pages: number;
  total_records: number;
}

@Injectable({ providedIn: 'root' })
export class ActorsService {
  constructor(private http: HttpClient) {}

  fetchActorsFromPage(page = 1) {
    return this.http.get<ActorResponse>(
      `https://www.swapi.tech/api/people?page=${page}&limit=10`
    );
  }
}
