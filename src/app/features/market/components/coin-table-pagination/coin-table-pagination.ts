import { Component, inject } from '@angular/core';
import { MarketState } from '@features/market/services/market-state';
import { ArrowLeftDashed } from '@icons/arrow-left-dashed/arrow-left-dashed';
import { ArrowRightDashed } from '@icons/arrow-right-dashed/arrow-right-dashed';

import { CoinTablePaginationButton } from '../coin-table-pagination-button/coin-table-pagination-button';

@Component({
  selector: 'app-coin-table-pagination',
  imports: [ArrowLeftDashed, ArrowRightDashed, CoinTablePaginationButton],
  templateUrl: './coin-table-pagination.html',
})
export class CoinTablePagination {
  protected marketState = inject(MarketState);

  changePage(page: number) {
    this.marketState.changePage(page);
  }
}
