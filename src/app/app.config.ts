import { DecimalPipe } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { coinGeckoInterceptor } from '@core/interceptors/coin-gecko-interceptor';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { ShortCurrencyPipe } from '@shared/pipes/short-currency-pipe';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([coinGeckoInterceptor])),
    provideHotToastConfig(),
    ShortCurrencyPipe,
    DecimalPipe,
  ],
};
