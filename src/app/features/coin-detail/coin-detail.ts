import { Component, effect, inject, input } from '@angular/core';

import { DetailHeader } from './components/detail-header/detail-header';
import { CoinDetailState } from './services/coin-detail-state';

@Component({
  selector: 'app-coin-detail',
  imports: [DetailHeader],
  templateUrl: './coin-detail.html',
})
export class CoinDetail {
  protected readonly coinDetailState = inject(CoinDetailState);

  id = input.required<string>();

  constructor() {
    effect(() => this.coinDetailState.setCoinId(this.id()));
  }
}
