import { TestBed } from '@angular/core/testing';

import { DashboardGridsterConfigService } from './dashboard-gridster-config.service';

describe('DashboardGridsterConfigService', () => {
  let service: DashboardGridsterConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardGridsterConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
