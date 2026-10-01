import { inject, Service } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';

@Service()
export class ToastService {
  private readonly toast = inject(HotToastService);

  success(message: string) {
    this.toast.success(message, {
      theme: 'snackbar',
      style: {
        padding: '12px 16px',
        fontFamily: 'Inter, sans-serif',
      },
      iconTheme: {
        primary: '#58a6ff',
        secondary: '#0b141c',
      },
    });
  }

  error(message: string) {
    this.toast.error(message, {
      theme: 'snackbar',
      style: {
        padding: '12px 16px',
        fontFamily: 'Inter, sans-serif',
      },
      iconTheme: {
        primary: '#f85149',
        secondary: '#0b141c',
      },
    });
  }
}
