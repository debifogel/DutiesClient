import { TestBed } from '@angular/core/testing';

import { ToranService } from './toran.service';

describe('ToranService', () => {
  let service: ToranService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToranService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
