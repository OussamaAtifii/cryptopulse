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
    const portfolioCoins = this.portfolioCoins.value();

    if (!portfolioCoins) {
      return [];
    }

    return transactions.map(transaction => {
      const coin = portfolioCoins.find(coin => coin.id === transaction.coinId);

      const coinPrice = coin?.current_price ?? 0;

      return {
        id: transaction.coinId,
        symbol: coin?.symbol,
        name: coin?.name ?? '',
        image: coin?.image ?? '',
        priceChangePercentage24h: coin?.price_change_percentage_24h ?? 0,
        amount: transaction.amount,
        price: coinPrice,
        value: transaction.amount * coinPrice,
      };
    });
  });

  readonly totalBalance = computed(() =>
    this.rows().reduce((total, row) => total + row.value, 0)
  );

  readonly portfolioCoins = this.coinGeckoApi.getPortfolioCoins(
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
