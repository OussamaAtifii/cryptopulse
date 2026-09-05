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
  });

  it('should create', () => {
    fixture.componentRef.setInput('title', 'Test title');
    fixture.componentRef.setInput('value', 2);
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
