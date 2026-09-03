import { Service, signal } from '@angular/core';

@Service()
export class SidebarState {
  readonly isOpen = signal(false);

  toggleSidebar(): void {
    this.isOpen.update(value => !value);
  }

  closeSidebar(): void {
    this.isOpen.set(false);
  }
}
