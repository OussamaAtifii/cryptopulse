import { Component } from '@angular/core';
import { SidebarItem as SidebarItemType } from '@layout/models/sidebar-item.model';

import { SidebarItem } from '../sidebar-item/sidebar-item';

@Component({
  selector: 'app-sidebar',
  imports: [SidebarItem],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  sidebarItems: SidebarItemType[] = [
    {
      title: 'Market',
      route: '/market',
    },
  ];
}
