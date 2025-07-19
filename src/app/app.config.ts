import { provideServerRendering } from '@angular/ssr';
import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from "@angular/core";
import { DefaultDataServiceConfig, provideEntityData, withEffects } from "@ngrx/data";
import { provideStore } from "@ngrx/store";
import { entityConfig } from "./entity-metadata";
import { provideEffects } from "@ngrx/effects";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { APP_ROUTES } from "./app.routes";
import { environment } from "src/environments/environment";
import { loadingInterceptor } from "./shared/interceptors/loading.interceptor";

const baseUrl = environment.BASE_URL;

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: baseUrl,
  timeout: 3000,
};

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
    provideZoneChangeDetection({ eventCoalescing: true, ignoreChangesOutsideZone: true }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode(), connectInZone: true}),
    provideAnimations(),
    provideHttpClient(withInterceptors([loadingInterceptor])),
    provideRouter(APP_ROUTES, withComponentInputBinding()),
    provideEntityData(entityConfig, withEffects()),
    provideEffects(),
    provideStore(),
    // provideServerRendering(),
    // provideRequestUrl('http://localhost:4000')

  ],
};
