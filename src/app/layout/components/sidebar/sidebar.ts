import { Component, input, output } from '@angular/core';
import { ChartBar } from '@icons/chart-bar/chart-bar';
import { Wallet } from '@icons/wallet/wallet';
import { SidebarItem as SidebarItemType } from '@layout/models/sidebar-item.model';

import { SidebarItem } from '../sidebar-item/sidebar-item';

@Component({
  selector: 'app-sidebar',
  imports: [SidebarItem],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  isOpen = input(false);
  navigate = output<void>();

  sidebarItems: SidebarItemType[] = [
    {
      title: 'Market',
      route: '/market',
      icon: ChartBar,
    },
    {
      title: 'Portfolio',
      route: '/portfolio',
      icon: Wallet,
    },
  ];
}
