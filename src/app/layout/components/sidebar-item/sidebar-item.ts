import { NgComponentOutlet } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarItem as SidebarItemType } from '@layout/models/sidebar-item.model';

@Component({
  selector: 'app-sidebar-item',
  imports: [RouterLink, RouterLinkActive, NgComponentOutlet],
  templateUrl: './sidebar-item.html',
})
export class SidebarItem {
  item = input.required<SidebarItemType>();
}
