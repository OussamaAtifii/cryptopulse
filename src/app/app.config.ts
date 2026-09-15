import { DecimalPipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { ShortCurrencyPipe } from '@shared/pipes/short-currency-pipe';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideHotToastConfig(),
    ShortCurrencyPipe,
    DecimalPipe,
  ],
};
