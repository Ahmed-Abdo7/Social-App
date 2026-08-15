import { TestBed } from '@angular/core/testing';

import { CommentsServer } from './comments.server';

describe('CommentsServer', () => {
  let service: CommentsServer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentsServer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
