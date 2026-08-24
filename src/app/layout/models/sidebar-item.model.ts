import { Type } from '@angular/core';

export interface SidebarItem {
  title: string;
  route: string;
  icon: Type<unknown>;
}
