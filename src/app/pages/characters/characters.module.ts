import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatLegacyPaginatorModule as MatPaginatorModule} from '@angular/material/legacy-paginator';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import { MatIconModule } from '@angular/material/icon';
import {MatLegacyAutocompleteModule as MatAutocompleteModule} from '@angular/material/legacy-autocomplete';

import { CharactersPage } from './containers/characters.page';

import { CharactersEntityService } from './services/characters-entity.service';
import { CharactersResolver } from './services/characters.resolver';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { CharactersDataService } from './services/characters-data.service';
import { environment } from 'src/environments/environment';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';


const entityMetaData: EntityMetadataMap = {
  Character: {
    entityDispatcherOptions: {
      optimisticSaveEntities: true,
      optimisticDelete: true
    }

  },

}


@NgModule({
  declarations: [CharactersPage],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: CharactersPage,
        resolve: {
          characters: CharactersResolver
        }
      }
    ]),
    HttpClientModule,
    MatProgressSpinnerModule

  ],
  providers: [
    CharactersEntityService,
    CharactersResolver,
  ]
})
export class CharactersModule {

  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private charactersDataService: CharactersDataService
  ) {
    eds.registerMetadataMap(entityMetaData);
    entityDataService.registerService('Character', charactersDataService);

  }
}
