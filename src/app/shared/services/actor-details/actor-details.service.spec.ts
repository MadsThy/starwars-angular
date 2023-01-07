import { TestBed } from '@angular/core/testing';

import { ActorDetailsService } from './actor-details.service';

describe('ActorDetailsService', () => {
  let service: ActorDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActorDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
