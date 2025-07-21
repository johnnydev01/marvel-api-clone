import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from "@angular/core";

import { provideAnimations } from "@angular/platform-browser/animations";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { APP_ROUTES } from "./app.routes";
import { loadingInterceptor } from "./shared/interceptors/loading.interceptor";


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true, ignoreChangesOutsideZone: true }),
    provideAnimations(),
    provideHttpClient(withInterceptors([loadingInterceptor])),
    provideRouter(APP_ROUTES, withComponentInputBinding()),
  ],
};
