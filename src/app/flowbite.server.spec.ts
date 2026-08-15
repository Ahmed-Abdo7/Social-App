import { TestBed } from '@angular/core/testing';

import { FlowbiteServer } from './flowbite.server';

describe('FlowbiteServer', () => {
  let service: FlowbiteServer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowbiteServer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
