import { TestBed } from '@angular/core/testing';

import { BreadcrumbState } from './breadcrumb-state';

describe('BreadcrumbState', () => {
  let service: BreadcrumbState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreadcrumbState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
