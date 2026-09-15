import { inject, Service } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';

@Service()
export class ToastService {
  private readonly toast = inject(HotToastService);

  success(message: string) {
    this.toast.success(message, {
      style: {
        width: 'auto',
        maxWidth: '360px',
        background: '#0b141c',
        border: 'none',
        borderRadius: '10px',
        padding: '12px 16px',
        color: '#f0f6fc',
        fontFamily: 'Inter, sans-serif',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
      },
      iconTheme: {
        primary: '#58a6ff',
        secondary: '#0b141c',
      },
    });
  }

  error(message: string) {
    this.toast.error(message, {
      style: {
        width: 'auto',
        maxWidth: '360px',
        background: '#0b141c',
        border: 'none',
        borderRadius: '10px',
        padding: '12px 16px',
        color: '#f0f6fc',
        fontFamily: 'Inter, sans-serif',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
      },
      iconTheme: {
        primary: '#f85149',
        secondary: '#0b141c',
      },
    });
  }
}
