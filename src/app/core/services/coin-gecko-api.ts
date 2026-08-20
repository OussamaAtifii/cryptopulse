import { httpResource } from '@angular/common/http';
import { Service, Signal } from '@angular/core';
import { ChartDays } from '@core/models/chart-days.model';
import { Coin } from '@core/models/coin.model';
import { CoinDetailResponse } from '@core/models/coin-detail-response.model';
import { CoinPriceChart } from '@core/models/coin-price-chart.model';

@Service()
export class CoinGeckoApi {
  private baseUrl = 'https://api.coingecko.com/api/v3';

  getMarkets(params: { page: Signal<number> }) {
    return httpResource<Coin[]>(() => ({
      url: this.baseUrl + '/coins/markets',
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        page: params.page(),
        per_page: 5,
        sparkline: true,
      },
    }));
  }

  getCoinDetail(id: Signal<string | null>) {
    return httpResource<CoinDetailResponse>(() => {
      if (!id()) return undefined;

      return {
        url: this.baseUrl + `/coins/${id()}`,
        params: {
          localization: false,
          tickers: false,
          community_data: false,
          developer_data: false,
        },
      };
    });
  }

  getCoinMarketChartData(id: Signal<string | null>, days: Signal<ChartDays>) {
    return httpResource<CoinPriceChart>(() => {
      if (!id()) return undefined;

      return {
        url: this.baseUrl + `/coins/${id()}/market_chart`,
        params: {
          vs_currency: 'usd',
          days: days(),
        },
      };
    });
  }
}
