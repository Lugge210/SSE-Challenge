import { TestBed } from '@angular/core/testing';

import { EmergencyHttpServiceService } from './emergency-http-service.service';

describe('EmergencyHttpServiceService', () => {
  let service: EmergencyHttpServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmergencyHttpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
