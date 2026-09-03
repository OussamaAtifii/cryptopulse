import { TestBed } from '@angular/core/testing';

import { SidebarState } from './sidebar-state';

describe('SidebarState', () => {
  let service: SidebarState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open, toggle and close the sidebar', () => {
    expect(service.isOpen()).toBe(false);

    service.toggleSidebar();
    expect(service.isOpen()).toBe(true);

    service.closeSidebar();
    expect(service.isOpen()).toBe(false);
  });
});
