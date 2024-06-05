import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SwiperModule } from 'swiper/angular';
import { ComicsPage } from './containers/comics.page';
import { ComicsCarouselComponent } from './components/comics-carousel/comics-carousel.component';

import {MatLegacyProgressSpinnerModule as MatProgressSpinnerModule} from '@angular/material/legacy-progress-spinner';
import { ComicsEntityService } from './services/comics-entity.service';
import { ComicsResolver } from './services/comics.resolver';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { ComicsDataService } from './services/comics-data.service';


const entityMetaData: EntityMetadataMap = {
  Comic: {
    entityDispatcherOptions: {
      optimisticSaveEntities: true,
      optimisticDelete: true
    }

  },

}

@NgModule({
  declarations: [
    ComicsPage,
    ComicsCarouselComponent,
  ],
  imports: [
    CommonModule,
    SwiperModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component: ComicsPage,
        title: 'Comics',
        resolve: {
          comics: ComicsResolver
        }
      }
    ]),
    MatProgressSpinnerModule
  ],
  providers: [
    ComicsEntityService,
    ComicsResolver
  ]
})
export class ComicsModule {

  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private charactersDataService: ComicsDataService
  ) {
    eds.registerMetadataMap(entityMetaData);
    entityDataService.registerService('Comic', charactersDataService);

  }
 }
