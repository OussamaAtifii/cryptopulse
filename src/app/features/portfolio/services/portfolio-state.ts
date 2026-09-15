import { computed, inject, Service, signal } from '@angular/core';
import { CoinGeckoApi } from '@core/services/coin-gecko-api';

import { Transaction } from '../models/transaction.model';

@Service()
export class PortfolioState {
  private readonly coinGeckoApi = inject(CoinGeckoApi);

  readonly portfolioCoinIds = signal<string[]>([
    'bitcoin',
    'ethereum',
    'solana',
    'binancecoin',
    'ripple',
  ]);

  readonly transactions = signal<Transaction[]>([
    { coinId: 'bitcoin', amount: 0.02 },
    { coinId: 'ethereum', amount: 1.75 },
    { coinId: 'binancecoin', amount: 7.9 },
    { coinId: 'ripple', amount: 87 },
  ]);

  readonly rows = computed(() => {
    const transactions = this.transactions();
    const simplePrice = this.simplePrice.value();

    if (!simplePrice) {
      return [];
    }

    return transactions.map(transaction => {
      const price = simplePrice[transaction.coinId]?.usd ?? 0;

      return {
        coinId: transaction.coinId,
        amount: transaction.amount,
        price,
        value: transaction.amount * price,
      };
    });
  });

  readonly totalBalance = computed(() =>
    this.rows().reduce((total, row) => total + row.value, 0)
  );

  readonly simplePrice = this.coinGeckoApi.getSimplePrice(
    this.portfolioCoinIds
  );

  addTransaction(newTransaction: Transaction) {
    const transactions = this.transactions();

    const coinExists = transactions.some(
      transaction => transaction.coinId === newTransaction.coinId
    );

    if (!coinExists) {
      this.transactions.update(current => [...current, newTransaction]);
      return;
    }

    this.transactions.update(current =>
      current.map(transaction =>
        transaction.coinId !== newTransaction.coinId
          ? transaction
          : {
              ...transaction,
              amount: transaction.amount + newTransaction.amount,
            }
      )
    );
  }
}
