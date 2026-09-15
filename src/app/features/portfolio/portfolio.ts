import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import {
  form,
  FormField,
  FormRoot,
  min,
  required,
} from '@angular/forms/signals';
import { CoinIcon } from '@shared/ui/coin-icon/coin-icon';
import { Modal } from '@shared/ui/modal/modal';
import { PriceChange } from '@shared/ui/price-change/price-change';

import { PortfolioState } from './services/portfolio-state';

@Component({
  selector: 'app-portfolio',
  imports: [CurrencyPipe, FormField, FormRoot, Modal, CoinIcon, PriceChange],
  templateUrl: './portfolio.html',
})
export class Portfolio {
  protected readonly portfolioState = inject(PortfolioState);

  protected readonly isTransactionModalOpen = signal(false);

  transactionModel = signal({
    coinId: '',
    amount: 0,
  });

  transactionForm = form(
    this.transactionModel,
    transaction => {
      required(transaction.coinId);
      min(transaction.amount, 0.000001);
    },
    {
      submission: {
        action: async field => {
          const value = field().value();

          this.portfolioState.addTransaction({
            coinId: value.coinId,
            amount: value.amount,
          });
        },
      },
    }
  );

  readonly transactionValue = computed(() => {
    const coinId = this.transactionForm.coinId().value();
    const amount = this.transactionForm.amount().value();

    const portfolioCoins = this.portfolioState.portfolioCoins.value();

    if (!portfolioCoins) return 0;

    const coin = portfolioCoins.find(coin => coin.id === coinId);

    if (!coin || !amount) {
      return 0;
    }

    return amount * coin.current_price;
  });

  readonly coinPrice = computed(() => {
    const coinId = this.transactionForm.coinId().value();
    const portfolioCoins = this.portfolioState.portfolioCoins.value();

    if (!portfolioCoins || !coinId) return 0;

    const coin = portfolioCoins.find(coin => coin.id === coinId);

    return coin?.current_price ?? 0;
  });
}
