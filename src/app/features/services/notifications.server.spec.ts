import { TestBed } from '@angular/core/testing';

import { NotificationsServer } from './notifications.server';

describe('NotificationsServer', () => {
  let service: NotificationsServer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationsServer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
