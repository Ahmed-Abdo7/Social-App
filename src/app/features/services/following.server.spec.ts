import { TestBed } from '@angular/core/testing';

import { FollowingServer } from './following.server';

describe('FollowingServer', () => {
  let service: FollowingServer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowingServer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
