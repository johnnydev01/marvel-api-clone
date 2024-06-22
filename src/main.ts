import { ENVIRONMENT_INITIALIZER, enableProdMode, importProvidersFrom, inject } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { PreloadAllModules, provideRouter, withDebugTracing, withPreloading } from '@angular/router';
import { APP_ROUTES } from './app/app.routes';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { EntityDataService, EntityDefinitionService, provideEntityData, withEffects } from '@ngrx/data';
import { entityConfig } from './app/entity-metadata';
import { provideStore } from '@ngrx/store';
import { metaReducers, reducers } from './app/state/app-state.reducer';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { RouterState, provideRouterStore } from '@ngrx/router-store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CharactersDataService } from './app/pages/characters/services/characters-data.service';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));

