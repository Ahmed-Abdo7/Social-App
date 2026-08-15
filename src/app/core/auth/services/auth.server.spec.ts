import { TestBed } from '@angular/core/testing';

import { AuthServer } from './auth.server';

describe('AuthServer', () => {
  let service: AuthServer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthServer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
