import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticItem } from './statistic-item';

describe('StatisticItem', () => {
  let component: StatisticItem;
  let fixture: ComponentFixture<StatisticItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticItem],
    }).compileComponents();

    fixture = TestBed.createComponent(StatisticItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
