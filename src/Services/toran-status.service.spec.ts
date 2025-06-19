import { TestBed } from '@angular/core/testing';

import { ToranStatusService } from './toran-status.service';

describe('ToranStatusService', () => {
  let service: ToranStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToranStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
