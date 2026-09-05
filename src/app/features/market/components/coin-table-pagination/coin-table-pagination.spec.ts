import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FIRST_PAGE, LAST_PAGE } from '@features/market/market.constants';
import { MarketState } from '@features/market/services/market-state';

import { CoinTablePagination } from './coin-table-pagination';

let mockMarketState: {
  page: ReturnType<typeof signal<number>>;
  previousPage: ReturnType<typeof vi.fn>;
  nextPage: ReturnType<typeof vi.fn>;
  changePage: ReturnType<typeof vi.fn>;
};

describe('CoinTablePagination', () => {
  let component: CoinTablePagination;
  let fixture: ComponentFixture<CoinTablePagination>;

  beforeEach(async () => {
    mockMarketState = {
      page: signal(1),
      previousPage: vi.fn(),
      nextPage: vi.fn(),
      changePage: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [CoinTablePagination],
      providers: [{ provide: MarketState, useValue: mockMarketState }],
    }).compileComponents();

    fixture = TestBed.createComponent(CoinTablePagination);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the previous button on the first page', () => {
    mockMarketState.page.set(FIRST_PAGE);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const previousBtn = compiled.querySelector(
      '[data-testid="previous-page-btn"] button'
    ) as HTMLButtonElement;

    expect(previousBtn.disabled).toBe(true);
  });

  it('should disable the next button on the last page', () => {
    mockMarketState.page.set(LAST_PAGE);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const nextBtn = compiled.querySelector(
      '[data-testid="next-page-btn"] button'
    ) as HTMLButtonElement;

    expect(nextBtn.disabled).toBe(true);
  });

  it('should call changePage with the correct page number when a numbered button is clicked', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const pageBtn = compiled.querySelector(
      '[data-testid="page-btn-2"] button'
    ) as HTMLButtonElement;

    pageBtn.click();

    expect(mockMarketState.changePage).toHaveBeenCalledWith(2);
  });

  it('should call previousPage when the left arrow is clicked', () => {
    mockMarketState.page.set(LAST_PAGE);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const previousBtn = compiled.querySelector(
      '[data-testid="previous-page-btn"] button'
    ) as HTMLButtonElement;

    previousBtn.click();

    expect(mockMarketState.previousPage).toHaveBeenCalled();
  });

  it('should call nextPage when the right arrow is clicked', () => {
    mockMarketState.page.set(FIRST_PAGE);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const nextBtn = compiled.querySelector(
      '[data-testid="next-page-btn"] button'
    ) as HTMLButtonElement;

    nextBtn.click();

    expect(mockMarketState.nextPage).toHaveBeenCalled();
  });
});
