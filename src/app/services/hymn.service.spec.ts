import { TestBed } from '@angular/core/testing';

import { HymnService } from './hymn.service';

describe('HymnService', () => {
  let service: HymnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HymnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
