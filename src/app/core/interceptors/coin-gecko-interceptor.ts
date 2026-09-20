import { HttpInterceptorFn } from '@angular/common/http';
import { COIN_GECKO_API_BASE } from '@core/constants/coin-gecko-api-base';
import { environment } from '@environment/environment';

export const coinGeckoInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith(COIN_GECKO_API_BASE)) {
    return next(req);
  }

  const request = req.clone({
    setParams: {
      x_cg_demo_api_key: environment.coinGeckoApiKey,
    },
  });

  return next(request);
};
