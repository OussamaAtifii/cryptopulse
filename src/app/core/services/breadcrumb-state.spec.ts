import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { BreadcrumbState } from './breadcrumb-state';

describe('BreadcrumbState', () => {
  let service: BreadcrumbState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });
    service = TestBed.inject(BreadcrumbState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
