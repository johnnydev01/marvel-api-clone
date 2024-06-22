import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from "@angular/core";
import { DefaultDataServiceConfig, provideEntityData, withEffects } from "@ngrx/data";
import { provideStore } from "@ngrx/store";
import { entityConfig } from "./entity-metadata";
import { provideEffects } from "@ngrx/effects";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideHttpClient } from "@angular/common/http";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { APP_ROUTES } from "./app.routes";
import { metaReducers, reducers } from "./state/app-state.reducer";
import { RouterState, provideRouterStore } from "@ngrx/router-store";
import { environment } from "src/environments/environment";

const baseUrl = environment.BASE_URL;

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: baseUrl,
  timeout: 3000,
};

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideStore(reducers, {
      metaReducers,
      runtimeChecks : {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictActionSerializability: true,
          strictStateSerializability:true
      }
  }),
    provideEffects(),
    provideEntityData(entityConfig, withEffects()),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode(), connectInZone: true}),
    provideAnimations(),
    provideHttpClient(),
    provideRouter(APP_ROUTES, withComponentInputBinding()),
    provideRouterStore({
      stateKey: 'router',
      routerState: RouterState.Minimal
    }),


  ],
};
