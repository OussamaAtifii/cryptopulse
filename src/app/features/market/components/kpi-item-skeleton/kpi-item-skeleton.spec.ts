import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiItemSkeleton } from './kpi-item-skeleton';

describe('KpiItemSkeleton', () => {
  let component: KpiItemSkeleton;
  let fixture: ComponentFixture<KpiItemSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KpiItemSkeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(KpiItemSkeleton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
