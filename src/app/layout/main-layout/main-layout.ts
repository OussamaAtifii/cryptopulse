import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from '@icons/menu/menu';
import { Breadcrumbs } from '@layout/components/breadcrumbs/breadcrumbs';
import { SidebarState } from '@layout/services/sidebar-state';

import { Sidebar } from '../components/sidebar/sidebar';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Sidebar, Breadcrumbs, Menu],
  templateUrl: './main-layout.html',
  host: {
    '(keydown.escape)': 'closeSidebar()',
  },
  styles: `
    :host {
      display: block;
      width: 100%;
      min-height: 100vh;
    }
  `,
})
export class MainLayout {
  protected readonly sidebarState = inject(SidebarState);

  protected closeSidebar(): void {
    this.sidebarState.closeSidebar();
  }
}
