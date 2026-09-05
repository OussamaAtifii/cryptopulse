import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChevronRight } from '@icons/chevron-right/chevron-right';
import { SidebarItem as SidebarItemType } from '@layout/models/sidebar-item.model';

import { SidebarItem } from './sidebar-item';

describe('SidebarItem', () => {
  let component: SidebarItem;
  let fixture: ComponentFixture<SidebarItem>;

  const mockItem: SidebarItemType = {
    title: 'Portfolio',
    route: '/portfolio',
    icon: ChevronRight,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarItem],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarItem);
    component = fixture.componentInstance;
  });

  function setItem(item: SidebarItemType) {
    fixture.componentRef.setInput('item', item);
    fixture.detectChanges();
  }

  it('should create', () => {
    setItem(mockItem);
    expect(component).toBeTruthy();
  });
});
