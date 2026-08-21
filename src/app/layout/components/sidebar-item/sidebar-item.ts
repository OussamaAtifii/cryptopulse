import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ChartBar } from '@icons/chart-bar/chart-bar';
import { SidebarItem as SidebarItemType } from '@layout/models/sidebar-item.model';

@Component({
  selector: 'app-sidebar-item',
  imports: [RouterLink, RouterLinkActive, ChartBar],
  templateUrl: './sidebar-item.html',
})
export class SidebarItem {
  item = input.required<SidebarItemType>();
}
