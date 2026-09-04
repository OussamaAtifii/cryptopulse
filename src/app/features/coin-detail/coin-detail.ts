import {
  CurrencyPipe,
  DecimalPipe,
  KeyValue,
  KeyValuePipe,
} from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { ChartDays, ChartDaysLabel } from '@core/models/chart-days.model';
import { PricePoint } from '@core/models/price-point.model';
import { ChartBar } from '@icons/chart-bar/chart-bar';
import { ChartLine } from '@icons/chart-line/chart-line';
import { ChevronsDown } from '@icons/chevrons-down/chevrons-down';
import { ChevronsUp } from '@icons/chevrons-up/chevrons-up';
import { Coins } from '@icons/coins/coins';
import { Refresh } from '@icons/refresh/refresh';
import { ShortCurrencyPipe } from '@shared/pipes/short-currency-pipe';
import { Button } from '@shared/ui/button/button';
import { PriceChart } from '@shared/ui/price-chart/price-chart';
import dayjs from 'dayjs';

import { DetailHeader } from './components/detail-header/detail-header';
import { DetailHeaderSkeleton } from './components/detail-header-skeleton/detail-header-skeleton';
import { DetailSkeleton } from './components/price-chart-skeleton/price-chart-skeleton';
import { StatisticItem } from './components/statistic-item/statistic-item';
import { StatisticsSkeleton } from './components/statistics-skeleton/statistics-skeleton';
import { CoinDetailState } from './services/coin-detail-state';

interface ExternalLink {
  label: string;
  url: string;
}

@Component({
  selector: 'app-coin-detail',
  imports: [
    DetailHeader,
    PriceChart,
    Button,
    DetailHeaderSkeleton,
    KeyValuePipe,
    CurrencyPipe,
    ShortCurrencyPipe,
    DecimalPipe,
    StatisticItem,
    Coins,
    ChartBar,
    Refresh,
    ChevronsUp,
    ChevronsDown,
    ChartLine,
    StatisticsSkeleton,
    DetailSkeleton,
  ],
  templateUrl: './coin-detail.html',
})
export class CoinDetail {
  protected readonly coinDetailState = inject(CoinDetailState);

  protected readonly ChartDays = ChartDays;
  protected readonly ChartDaysLabel = ChartDaysLabel;

  protected readonly isDescriptionExpanded = signal(false);

  id = input.required<string>();

  constructor() {
    effect(() => {
      this.coinDetailState.setCoinId(this.id());
      this.isDescriptionExpanded.set(false);
    });
  }

  coin = computed(() => this.coinDetailState.coinDetail.value());

  chartData = computed<PricePoint[]>(() => {
    const prices = this.coinDetailState.coinPriceChartData.value()?.prices;

    if (!prices) return [];

    return prices.map(price => ({
      time: dayjs(price[0]).unix(),
      value: price[1],
    }));
  });

  protected readonly description = computed(() => {
    const content = this.coin()?.description?.en ?? '';

    return content
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  });

  protected readonly displayedDescription = computed(() => {
    const description = this.description();

    if (this.isDescriptionExpanded() || description.length <= 500) {
      return description;
    }

    return `${description.slice(0, 500).trimEnd()}...`;
  });

  protected readonly hasLongDescription = computed(
    () => this.description().length > 500
  );

  protected readonly externalLinks = computed<ExternalLink[]>(() => {
    const links = this.coin()?.links;

    if (!links) return [];

    return [
      { label: 'Website', url: links.homepage?.[0] },
      { label: 'Whitepaper', url: links.whitepaper },
      { label: 'Blockchain', url: links.blockchain_site?.[0] },
      {
        label: 'X',
        url: this.toTwitterUrl(links.twitter_screen_name),
      },
      {
        label: 'Telegram',
        url: this.toTelegramUrl(links.telegram_channel_identifier),
      },
      { label: 'Reddit', url: links.subreddit_url },
      { label: 'GitHub', url: links.repos_url?.github?.[0] },
    ].filter((link): link is ExternalLink => Boolean(link.url));
  });

  originalOrder = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    a: KeyValue<string, string>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    b: KeyValue<string, string>
  ): number => {
    return 0;
  };

  private toTwitterUrl(username: string | undefined): string {
    return username ? `https://x.com/${username}` : '';
  }

  private toTelegramUrl(channel: string | undefined): string {
    return channel ? `https://t.me/${channel}` : '';
  }
}
