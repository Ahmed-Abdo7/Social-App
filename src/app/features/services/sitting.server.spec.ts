import { TestBed } from '@angular/core/testing';

import { SittingServer } from './sitting.server';

describe('SittingServer', () => {
  let service: SittingServer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SittingServer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
