import { TestBed } from '@angular/core/testing';

import { ProfileServer } from './profile.server';

describe('ProfileServer', () => {
  let service: ProfileServer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileServer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
