import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { InitService } from '../core/services/init-service';
import { lastValueFrom } from 'rxjs';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideAppInitializer(async () => {
      const initService = inject(InitService);
      return new Promise<void>((resolve) => {
        setTimeout(async () => {
          try {
            return lastValueFrom(initService.init())
          } finally {
            const splash = document.getElementById("initial-splash");
            if (splash) {
              splash.remove();
            }
            resolve();
          }
        }, 500);
      });
    }),
    provideRouter(routes)
  ]
};
