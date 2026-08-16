import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CoinDetailState } from '@features/coin-detail/services/coin-detail-state';
import { CoinIcon } from '@shared/ui/coin-icon/coin-icon';

@Component({
  selector: 'app-detail-header',
  imports: [CurrencyPipe, CoinIcon],
  templateUrl: './detail-header.html',
})
export class DetailHeader {
  protected readonly coinDetailState = inject(CoinDetailState);
}
