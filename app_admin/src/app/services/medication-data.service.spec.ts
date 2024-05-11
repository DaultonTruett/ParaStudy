import { TestBed } from '@angular/core/testing';

import { MedicationDataService } from './medication-data.service';

describe('MedicationDataService', () => {
  let service: MedicationDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicationDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
