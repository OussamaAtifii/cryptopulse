import { Component, inject } from '@angular/core';
import { FIRST_PAGE, LAST_PAGE } from '@features/market/market.constants';
import { MarketState } from '@features/market/services/market-state';
import { ArrowLeftDashed } from '@icons/arrow-left-dashed/arrow-left-dashed';
import { ArrowRightDashed } from '@icons/arrow-right-dashed/arrow-right-dashed';
import { Button } from '@shared/ui/button/button';

@Component({
  selector: 'app-coin-table-pagination',
  imports: [ArrowLeftDashed, ArrowRightDashed, Button],
  templateUrl: './coin-table-pagination.html',
})
export class CoinTablePagination {
  protected marketState = inject(MarketState);

  readonly firstPage = FIRST_PAGE;
  readonly lastPage = LAST_PAGE;

  changePage(page: number) {
    this.marketState.changePage(page);
  }
}
