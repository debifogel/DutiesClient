import { TestBed } from '@angular/core/testing';

import { ToranWeeklyService } from './toran-weekly.service';

describe('ToranWeeklyService', () => {
  let service: ToranWeeklyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToranWeeklyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
