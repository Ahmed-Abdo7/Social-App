import { TestBed } from '@angular/core/testing';

import { PostsServer } from './posts.server';

describe('PostsServer', () => {
  let service: PostsServer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsServer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
